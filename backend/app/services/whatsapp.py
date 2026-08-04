"""
Notificação de novos leads via WhatsApp, usando a Twilio WhatsApp Business API.

Por que Twilio? É a forma mais simples de enviar mensagens de WhatsApp
programaticamente sem precisar aprovar um app diretamente na Meta. Você cria
uma conta gratuita em https://www.twilio.com/whatsapp, pega o Account SID e
Auth Token, e usa o número de sandbox deles para testar sem custo.

Se as variáveis TWILIO_* não estiverem configuradas no .env, a notificação é
simplesmente pulada (o lead continua sendo salvo no banco normalmente) — assim
o projeto funciona localmente sem precisar de conta na Twilio.
"""

import logging

import httpx

from app.core.config import settings
from app.models.lead import Lead

logger = logging.getLogger(__name__)

TWILIO_API_URL_TEMPLATE = "https://api.twilio.com/2010-04-01/Accounts/{sid}/Messages.json"


def is_whatsapp_configured() -> bool:
    return bool(
        settings.TWILIO_ACCOUNT_SID
        and settings.TWILIO_AUTH_TOKEN
        and settings.TWILIO_WHATSAPP_FROM
        and settings.NOTIFY_WHATSAPP_TO
    )


def _build_message(lead: Lead) -> str:
    linhas = [
        "🎯 *Novo lead no site ETPI!*",
        f"Nome: {lead.nome}",
        f"E-mail: {lead.email}",
        f"Telefone: {lead.telefone}",
    ]
    if lead.empresa:
        linhas.append(f"Empresa: {lead.empresa}")
    if lead.numero_colaboradores:
        linhas.append(f"Colaboradores: {lead.numero_colaboradores}")
    if lead.plano_interesse:
        linhas.append(f"Plano de interesse: {lead.plano_interesse}")
    if lead.mensagem:
        linhas.append(f"Mensagem: {lead.mensagem}")
    return "\n".join(linhas)


async def send_new_lead_notification(lead: Lead) -> bool:
    """Envia notificação de novo lead via WhatsApp. Retorna True se enviou com sucesso."""
    if not is_whatsapp_configured():
        logger.info(
            "Notificação de WhatsApp não configurada (variáveis TWILIO_* ausentes). "
            "Lead salvo normalmente, mas notificação foi pulada."
        )
        return False

    url = TWILIO_API_URL_TEMPLATE.format(sid=settings.TWILIO_ACCOUNT_SID)
    data = {
        "From": settings.TWILIO_WHATSAPP_FROM,
        "To": settings.NOTIFY_WHATSAPP_TO,
        "Body": _build_message(lead),
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(
                url,
                data=data,
                auth=(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN),
            )
            response.raise_for_status()
            logger.info(f"Notificação de WhatsApp enviada para o lead {lead.id}")
            return True
    except httpx.HTTPError as e:
        logger.error(f"Falha ao enviar notificação de WhatsApp para o lead {lead.id}: {e}")
        return False
