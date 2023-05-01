"""Model run model.

A model run is an essential component of an annotation project, particularly
when the goal is to train a machine learning model. It is a set of predictions
generated by the model over a group of recording clips. Each model run must
have a name and version to identify the model used to generate the predictions.

The model run is composed of predictions made in recording clips. These
predictions can be in the form of predicted tags at the clip level or as
predicted sound events, each with its own set of predicted tags. The predicted
tags also have a probability assigned, which indicates the confidence level of
the model's predictions.

Model runs can be explored and evaluated using the annotations from an
annotation project. By comparing the model's predictions to the annotations, it
is possible to assess the model's accuracy and identify areas where it is
struggling. This information can be used to improve the model by refining the
training data or adjusting the model's parameters.
"""

import sqlalchemy.orm as orm
from sqlalchemy import ForeignKey, UniqueConstraint

from whombat.database.models.base import Base
from whombat.database.models.note import Note

__all__ = [
    "ModelRun",
    "ModelRunNote",
]


class ModelRun(Base):
    """Model run model."""

    __tablename__ = "model_run"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    """Unique identifier of the model run."""

    name: orm.Mapped[str] = orm.mapped_column(nullable=False)
    """Name of the model run."""

    version: orm.Mapped[str] = orm.mapped_column(nullable=False)
    """Version of the model used to generate the predictions."""


class ModelRunNote(Base):
    """Model run note model."""

    __tablename__ = "model_run_note"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    """Unique identifier of the model run note."""

    model_run_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("model_run.id"),
        nullable=False,
    )
    """Unique identifier of the model run."""

    model_run: orm.Mapped[ModelRun] = orm.relationship()
    """Model run to which the note belongs."""

    note_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("note.id"),
        nullable=False,
    )
    """Unique identifier of the note."""

    note: orm.Mapped[Note] = orm.relationship()
    """Note to which the model run note belongs."""

    __table_args__ = (
        UniqueConstraint(
            "model_run_id",
            "note_id",
        ),
    )