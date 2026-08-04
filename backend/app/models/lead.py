import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class LeadStatus(str, enum.Enum):
    novo = "novo"
    em_contato = "em_contato"
    qualificado = "qualificado"
    convertido = "convertido"
    descartado = "descartado"


class LeadOrigem(str, enum.Enum):
    formulario_site = "formulario_site"
    whatsapp = "whatsapp"
    indicacao = "indicacao"
    outro = "outro"


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    nome: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    telefone: Mapped[str] = mapped_column(String(30), nullable=False)
    empresa: Mapped[str | None] = mapped_column(String(150), nullable=True)
    cargo: Mapped[str | None] = mapped_column(String(100), nullable=True)
    numero_colaboradores: Mapped[str | None] = mapped_column(String(50), nullable=True)
    mensagem: Mapped[str | None] = mapped_column(Text, nullable=True)
    plano_interesse: Mapped[str | None] = mapped_column(String(50), nullable=True)

    origem: Mapped[LeadOrigem] = mapped_column(
        Enum(LeadOrigem, name="lead_origem"), default=LeadOrigem.formulario_site
    )
    status: Mapped[LeadStatus] = mapped_column(
        Enum(LeadStatus, name="lead_status"), default=LeadStatus.novo
    )

    whatsapp_notificado: Mapped[bool] = mapped_column(default=False)
    email_notificado: Mapped[bool] = mapped_column(default=False)

    criado_em: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    atualizado_em: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
