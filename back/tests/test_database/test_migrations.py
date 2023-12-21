"""Test suite for migrations and database creation."""

from sqlalchemy.engine import URL
from pathlib import Path

from whombat.database import utils


def test_can_detect_database_that_needs_creation(database_url: URL):
    """Test that we can detect a database that needs creation.

    We are using the `sqlite+aiosqlite://` url here, which is the
    default database url for the application. This url does not create
    the database file automatically, so we expect the database to need
    creation.
    """
    cfg = utils.create_alembic_config(database_url, is_async=False)
    engine = utils.create_sync_db_engine(database_url)

    with engine.connect() as conn:
        assert (
            utils.get_db_state(conn, cfg) == utils.DatabaseState.NEEDS_CREATION
        )


def test_can_create_database(
    database_url: URL,
    database_test: Path,
):
    """Test that we can create a database."""
    cfg = utils.create_alembic_config(database_url, is_async=False)
    engine = utils.create_sync_db_engine(database_url)

    with engine.connect() as conn:
        # Create the database
        utils.create_or_update_db(conn, cfg)

    # Check that the database file exists
    assert database_test.exists()

    with engine.connect() as conn:
        assert utils.get_db_state(conn, cfg) == utils.DatabaseState.OK