from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Banco de dados
    DATABASE_URL: str = "postgresql+psycopg://etpi:etpi_dev@db:5432/etpi_db"

    # CORS - domínios do frontend autorizados a chamar a API
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    # Twilio (WhatsApp Business API) - opcional.
    # Se não configurado, a notificação de novo lead só é salva no banco (sem envio).
    TWILIO_ACCOUNT_SID: str | None = None
    TWILIO_AUTH_TOKEN: str | None = None
    TWILIO_WHATSAPP_FROM: str | None = None  # ex: "whatsapp:+14155238886"
    NOTIFY_WHATSAPP_TO: str | None = None    # seu número, ex: "whatsapp:+5547999999999"

    # E-mail (SMTP) - opcional.
    # Se não configurado, a notificação de novo lead por e-mail é pulada.
    SMTP_HOST: str | None = None
    SMTP_PORT: int = 587
    SMTP_USER: str | None = None
    SMTP_PASSWORD: str | None = None
    SMTP_FROM: str | None = None           # ex: "ETPI <contato@etpi.app.br>"
    NOTIFY_EMAIL_TO: str | None = None     # seu e-mail, ex: "voce@etpi.app.br"


settings = Settings()
