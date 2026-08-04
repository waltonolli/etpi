"""cria tabela leads

Revision ID: 0001
Revises:
Create Date: 2026-07-07

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    lead_origem = postgresql.ENUM(
        "formulario_site", "whatsapp", "indicacao", "outro", name="lead_origem"
    )
    lead_status = postgresql.ENUM(
        "novo", "em_contato", "qualificado", "convertido", "descartado",
        name="lead_status",
    )
    lead_origem.create(op.get_bind(), checkfirst=True)
    lead_status.create(op.get_bind(), checkfirst=True)

    # create_type=False é essencial aqui: o tipo ENUM já foi criado manualmente
    # acima (com checkfirst=True). Sem isso, o create_table tenta criar o
    # mesmo tipo de novo automaticamente e quebra com "type already exists".
    lead_origem_col = postgresql.ENUM(
        "formulario_site", "whatsapp", "indicacao", "outro",
        name="lead_origem", create_type=False,
    )
    lead_status_col = postgresql.ENUM(
        "novo", "em_contato", "qualificado", "convertido", "descartado",
        name="lead_status", create_type=False,
    )

    op.create_table(
        "leads",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("nome", sa.String(length=150), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("telefone", sa.String(length=30), nullable=False),
        sa.Column("empresa", sa.String(length=150), nullable=True),
        sa.Column("cargo", sa.String(length=100), nullable=True),
        sa.Column("numero_colaboradores", sa.String(length=50), nullable=True),
        sa.Column("mensagem", sa.Text(), nullable=True),
        sa.Column("plano_interesse", sa.String(length=50), nullable=True),
        sa.Column("origem", lead_origem_col, nullable=False, server_default="formulario_site"),
        sa.Column("status", lead_status_col, nullable=False, server_default="novo"),
        sa.Column("whatsapp_notificado", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("criado_em", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("atualizado_em", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_leads_email", "leads", ["email"])


def downgrade() -> None:
    op.drop_index("ix_leads_email", table_name="leads")
    op.drop_table("leads")
    postgresql.ENUM(name="lead_status").drop(op.get_bind(), checkfirst=True)
    postgresql.ENUM(name="lead_origem").drop(op.get_bind(), checkfirst=True)
