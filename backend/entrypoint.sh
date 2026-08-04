#!/bin/sh
set -e

echo "Aguardando o banco de dados ficar disponível..."
python -c "
import time
import sys
from sqlalchemy import create_engine, text
from app.core.config import settings

for i in range(30):
    try:
        engine = create_engine(settings.DATABASE_URL)
        with engine.connect() as conn:
            conn.execute(text('SELECT 1'))
        print('Banco de dados disponível.')
        sys.exit(0)
    except Exception as e:
        print(f'Tentativa {i+1}/30 - banco ainda não disponível: {e}')
        time.sleep(2)
sys.exit(1)
"

echo "Rodando migrations..."
alembic upgrade head

echo "Iniciando servidor..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
