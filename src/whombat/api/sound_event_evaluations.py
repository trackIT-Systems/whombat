"""API functions to interact with sound event evaluations."""
from uuid import UUID

from soundevent import data
from sqlalchemy import and_, tuple_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql.expression import ColumnElement

from whombat import models, schemas
from whombat.api import features
from whombat.api.common import (
    BaseAPI,
    create_object,
    delete_object,
    update_object,
)
from whombat.api.sound_event_annotations import sound_event_annotations
from whombat.api.sound_event_predictions import sound_event_predictions


class SoundEventEvaluationAPI(
    BaseAPI[
        UUID,
        models.SoundEventEvaluation,
        schemas.SoundEventEvaluation,
        schemas.SoundEventEvaluationCreate,
        schemas.SoundEventEvaluationUpdate,
    ]
):
    """API for sound event evaluations."""

    async def add_metric(
        self,
        session: AsyncSession,
        obj: schemas.SoundEventEvaluation,
        metric: schemas.Feature,
    ) -> schemas.SoundEventEvaluation:
        """Add a metric to a sound event evaluation."""
        for m in obj.metrics:
            if m.feature_name == metric.feature_name:
                raise ValueError(
                    f"Sound event evaluation {obj.id} already has a metric "
                    f"with feature name {metric.feature_name}."
                )

        await create_object(
            session,
            models.SoundEventEvaluationMetric,
            schemas.SoundEventEvaluationMetricCreate(
                sound_event_evaluation_id=obj.id,
                feature_name_id=metric.feature_name.id,
                value=metric.value,
            ),
        )
        obj.metrics.append(metric)
        self._update_cache(obj)
        return obj

    async def update_metric(
        self,
        session: AsyncSession,
        obj: schemas.SoundEventEvaluation,
        metric: schemas.Feature,
    ) -> schemas.SoundEventEvaluation:
        """Update a metric of a sound event evaluation."""
        for m in obj.metrics:
            if m.feature_name == metric.feature_name:
                break
        else:
            raise ValueError(
                f"Sound event evaluation {obj.id} does not have a metric "
                f"with feature name {metric.feature_name}."
            )

        await update_object(
            session,
            models.SoundEventEvaluationMetric,
            and_(
                models.SoundEventEvaluationMetric.sound_event_evaluation_id
                == obj.id,
                models.SoundEventEvaluationMetric.feature_name_id
                == metric.feature_name.id,
            ),
            value=metric.value,
        )
        obj = obj.model_copy(
            update=dict(
                metrics=[
                    m if m.feature_name != metric.feature_name else metric
                    for m in obj.metrics
                ]
            )
        )
        self._update_cache(obj)
        return obj

    async def remove_metric(
        self,
        session: AsyncSession,
        obj: schemas.SoundEventEvaluation,
        metric: schemas.Feature,
    ) -> schemas.SoundEventEvaluation:
        """Remove a metric from a sound event evaluation."""
        for m in obj.metrics:
            if m.feature_name == metric.feature_name:
                break
        else:
            raise ValueError(
                f"Sound event evaluation {obj.id} does not have a metric "
                f"with feature name {metric.feature_name}."
            )

        await delete_object(
            session,
            models.SoundEventEvaluationMetric,
            and_(
                models.SoundEventEvaluationMetric.sound_event_evaluation_id
                == obj.id,
                models.SoundEventEvaluationMetric.feature_name_id
                == metric.feature_name.id,
            ),
        )

        obj = obj.model_copy(
            update=dict(
                metrics=[
                    m
                    for m in obj.metrics
                    if m.feature_name != metric.feature_name
                ]
            )
        )
        self._update_cache(obj)
        return obj

    async def from_soundevent(
        self,
        session: AsyncSession,
        data: data.Match,
        clip_evaluation: schemas.ClipEvaluation,
    ) -> schemas.SoundEventEvaluation:
        """Create a sound event evaluation from a sound event evaluation."""
        sound_event_annotation = None
        if data.target:
            sound_event_annotation = (
                await sound_event_annotations.from_soundevent(
                    session,
                    data.target,
                    clip_evaluation.clip_annotation,
                )
            )

        sound_event_prediction = None
        if data.source:
            sound_event_prediction = (
                await sound_event_predictions.from_soundevent(
                    session, data.source, clip_evaluation.clip_prediction.id
                )
            )

        obj = await self.create(
            session,
            schemas.SoundEventEvaluationCreate(
                clip_evaluation_id=clip_evaluation.id,
                source_id=sound_event_prediction.id
                if sound_event_prediction
                else None,
                target_id=sound_event_annotation.id
                if sound_event_annotation
                else None,
                affinity=data.affinity,
                score=data.score or 0,
            ),
        )

        for feature in data.metrics:
            feat = await features.from_soundevent(
                session,
                feature,
            )
            obj = await self.add_metric(session, obj, feat)

        return obj

    def to_soundevent(
        self,
        obj: schemas.SoundEventEvaluation,
    ) -> data.Match:
        """Convert a sound event evaluation to soundevent format."""
        source = None
        if obj.source:
            source = sound_event_predictions.to_soundevent(obj.source)

        target = None
        if obj.target:
            target = sound_event_annotations.to_soundevent(obj.target)

        return data.Match(
            uuid=obj.uuid,
            affinity=obj.affinity,
            score=obj.score,
            source=source,
            target=target,
            metrics=[features.to_soundevent(m) for m in obj.metrics],
        )

    @classmethod
    def _key_fn(
        cls, obj: schemas.SoundEventEvaluation | models.SoundEventEvaluation
    ) -> tuple[int, int | None, int | None]:
        return (
            obj.clip_evaluation_id,
            obj.source_id,
            obj.target_id,
        )

    @classmethod
    def _get_key_column(cls) -> ColumnElement:
        return tuple_(
            models.SoundEventEvaluation.clip_evaluation_id,
            models.SoundEventEvaluation.source_id,
            models.SoundEventEvaluation.target_id,
        )


sound_event_evaluations = SoundEventEvaluationAPI()
