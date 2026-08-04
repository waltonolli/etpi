from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    """Classe base de onde todos os models SQLAlchemy herdam."""

    pass


def get_db() -> Generator:
    """Dependency do FastAPI: abre uma sessão de banco por request e fecha ao final."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
