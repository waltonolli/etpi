import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, ConfigDict

from app.models.lead import LeadStatus


class LeadCreate(BaseModel):
    """Dados recebidos do formulário de captura de lead no site."""

    nome: str = Field(min_length=2, max_length=150)
    email: EmailStr
    telefone: str = Field(min_length=8, max_length=30)
    empresa: str | None = Field(default=None, max_length=150)
    cargo: str | None = Field(default=None, max_length=100)
    numero_colaboradores: str | None = Field(default=None, max_length=50)
    mensagem: str | None = Field(default=None, max_length=2000)
    plano_interesse: str | None = Field(default=None, max_length=50)


class LeadOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    nome: str
    email: str
    telefone: str
    empresa: str | None
    cargo: str | None
    numero_colaboradores: str | None
    mensagem: str | None
    plano_interesse: str | None
    status: LeadStatus
    criado_em: datetime


class LeadStatusUpdate(BaseModel):
    status: LeadStatus
