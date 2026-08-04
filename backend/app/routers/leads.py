import asyncio
import uuid

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadOut, LeadStatusUpdate
from app.services import email, whatsapp

router = APIRouter(prefix="/api/leads", tags=["leads"])


async def _notificar_e_marcar(lead_id: uuid.UUID, db: Session) -> None:
    """Task em background: dispara WhatsApp e e-mail em paralelo, marcando cada um
    independente do resultado do outro (se um falhar, o outro segue normalmente)."""
    lead = db.get(Lead, lead_id)
    if lead is None:
        return

    whatsapp_enviado, email_enviado = await asyncio.gather(
        whatsapp.send_new_lead_notification(lead),
        email.send_new_lead_notification(lead),
    )

    if whatsapp_enviado:
        lead.whatsapp_notificado = True
    if email_enviado:
        lead.email_notificado = True
    if whatsapp_enviado or email_enviado:
        db.commit()


@router.post("", response_model=LeadOut, status_code=201)
async def criar_lead(
    payload: LeadCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> Lead:
    """
    Recebe um novo lead do formulário do site, salva no banco e dispara
    as notificações de WhatsApp e e-mail em background (não bloqueia a
    resposta ao usuário).
    """
    lead = Lead(**payload.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)

    background_tasks.add_task(_notificar_e_marcar, lead.id, db)

    return lead


@router.get("", response_model=list[LeadOut])
def listar_leads(db: Session = Depends(get_db)) -> list[Lead]:
    """Lista todos os leads, mais recentes primeiro. Usado no painel interno."""
    stmt = select(Lead).order_by(Lead.criado_em.desc())
    return list(db.scalars(stmt))


@router.get("/{lead_id}", response_model=LeadOut)
def obter_lead(lead_id: uuid.UUID, db: Session = Depends(get_db)) -> Lead:
    lead = db.get(Lead, lead_id)
    if lead is None:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    return lead


@router.patch("/{lead_id}/status", response_model=LeadOut)
def atualizar_status(
    lead_id: uuid.UUID, payload: LeadStatusUpdate, db: Session = Depends(get_db)
) -> Lead:
    lead = db.get(Lead, lead_id)
    if lead is None:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    lead.status = payload.status
    db.commit()
    db.refresh(lead)
    return lead
