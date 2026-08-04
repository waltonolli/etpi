"""
Notificação de novos leads por e-mail, via SMTP.

Funciona com qualquer provedor SMTP: Gmail, Outlook, SendGrid, Resend, etc.
Se as variáveis SMTP_* não estiverem configuradas no .env, a notificação é
simplesmente pulada (o lead continua sendo salvo no banco normalmente).

Exemplos de configuração:
- Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=587, use uma "senha de app"
  (não a senha normal da conta) - gere em https://myaccount.google.com/apppasswords
- SendGrid: SMTP_HOST=smtp.sendgrid.net, SMTP_PORT=587, SMTP_USER=apikey,
  SMTP_PASSWORD=<sua API key>
- Resend: SMTP_HOST=smtp.resend.com, SMTP_PORT=587, SMTP_USER=resend,
  SMTP_PASSWORD=<sua API key>
"""

import asyncio
import logging
import smtplib
from email.message import EmailMessage

from app.core.config import settings
from app.models.lead import Lead

logger = logging.getLogger(__name__)


def is_email_configured() -> bool:
    return bool(
        settings.SMTP_HOST
        and settings.SMTP_USER
        and settings.SMTP_PASSWORD
        and settings.SMTP_FROM
        and settings.NOTIFY_EMAIL_TO
    )


def _build_email(lead: Lead) -> EmailMessage:
    linhas = [
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

    msg = EmailMessage()
    msg["Subject"] = f"Novo lead no site ETPI — {lead.nome}"
    msg["From"] = settings.SMTP_FROM
    msg["To"] = settings.NOTIFY_EMAIL_TO
    msg.set_content("\n".join(linhas))
    return msg


def _send_sync(msg: EmailMessage) -> None:
    """Envio bloqueante via smtplib - roda numa thread separada para não travar o event loop."""
    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.send_message(msg)


async def send_new_lead_notification(lead: Lead) -> bool:
    """Envia notificação de novo lead por e-mail. Retorna True se enviou com sucesso."""
    if not is_email_configured():
        logger.info(
            "Notificação por e-mail não configurada (variáveis SMTP_* ausentes). "
            "Lead salvo normalmente, mas notificação foi pulada."
        )
        return False

    msg = _build_email(lead)
    try:
        await asyncio.to_thread(_send_sync, msg)
        logger.info(f"Notificação por e-mail enviada para o lead {lead.id}")
        return True
    except (smtplib.SMTPException, OSError) as e:
        logger.error(f"Falha ao enviar notificação por e-mail para o lead {lead.id}: {e}")
        return False
