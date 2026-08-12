# ETPI — Site + API de captura de leads

Stack: **React + TypeScript** (frontend) · **FastAPI + SQLAlchemy + Alembic** (backend) · **PostgreSQL** (banco) · **Docker Compose** (Postgres + Backend).

## Estrutura

```
etpi-app/
├── docker-compose.yml     # sobe Postgres + Backend
├── .env                   # configurado
├── backend/                # API FastAPI
└── frontend/                # site em React (roda fora do Docker, via npm)
```

## Passo a passo para rodar local

### 1. Configurar variáveis de ambiente

```bash
cp .env
```

Abra o `.env` e, se quiser ativar as notificações de novo lead por WhatsApp e/ou
e-mail, preencha as variáveis `TWILIO_*` e `SMTP_*`.
As duas notificações são independentes:
você pode ativar só uma, as duas, ou nenhuma — se deixar em branco, o site
funciona normalmente e os leads só não disparam a notificação correspondente.

### 2. Subir o banco de dados e a API

Isso requer o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

```bash
docker compose up --build
```

Isso vai:
- Subir um container Postgres, já configurado
- Subir o backend FastAPI, aguardando o banco ficar pronto
- Rodar as migrations automaticamente (criação da tabela `leads`)
- Deixar a API disponível em **http://localhost:8000**
- Documentação interativa (Swagger) em **http://localhost:8000/docs**

Para rodar em segundo plano: `docker compose up -d --build`
Para parar: `docker compose down` (os dados do Postgres continuam salvos)
Para apagar tudo, incluindo os dados: `docker compose down -v`

### 3. Rodar o frontend

O frontend roda fora do Docker, direto na sua máquina (mais rápido para desenvolvimento):

```bash
cd frontend
cp .env
npm install
npm run dev
```

Site disponível em **http://localhost:5173**.

## Testando o formulário de leads

1. Acesse http://localhost:5173, preencha o formulário no final da página e envie
2. Verifique se o lead foi salvo: `GET http://localhost:8000/api/leads` (ou pelo Swagger em `/docs`)
3. Se configurou o Twilio e/ou o SMTP, deve chegar uma notificação no seu WhatsApp
   e/ou e-mail em poucos segundos (elas são enviadas em paralelo e de forma independente)

## Próximos passos sugeridos

- [ ] Trocar os números de telefone/WhatsApp de exemplo pelos reais (`WhatsAppButton.tsx`, `Footer.tsx`, `.env`)
- [ ] Adicionar depoimentos reais de clientes (prova social)
- [ ] Criar um painel interno simples para visualizar/gerenciar os leads (`GET /api/leads` já existe)
- [ ] Configurar deploy (ex: Postgres gerenciado + backend em container + frontend estático)
- [ ] Adicionar testes automatizados (pytest no backend, Vitest no frontend)
