"""Settings for whombat.

We are using pydantic to define our settings.
"""
from functools import lru_cache
from pydantic import BaseSettings

__all__ = ["Settings"]


class Settings(BaseSettings):
    """Settings for whombat."""

    db_url: str = "sqlite+aiosqlite:///whombat.db"

    app_name: str = "Whombat"

    admin_username: str = "admin"

    admin_password: str = "admin"

    admin_email: str = "admin@whombat.com"


@lru_cache()
def get_settings() -> Settings:
    """Get the application settings."""
    return Settings()