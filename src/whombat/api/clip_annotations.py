"""Python API for clip annotations."""

from uuid import UUID

from soundevent import data
from sqlalchemy import and_
from sqlalchemy.ext.asyncio import AsyncSession

from whombat import exceptions, models, schemas
from whombat.api import common, notes, tags
from whombat.api.clips import clips
from whombat.api.common import BaseAPI
from whombat.api.sound_event_annotations import sound_event_annotations

__all__ = [
    "ClipAnnotationAPI",
    "clip_annotations",
]


class ClipAnnotationAPI(
    BaseAPI[
        UUID,
        models.ClipAnnotation,
        schemas.ClipAnnotation,
        schemas.ClipAnnotationCreate,
        schemas.ClipAnnotationUpdate,
    ]
):
    _model = models.ClipAnnotation
    _schema = schemas.ClipAnnotation

    async def add_tag(
        self,
        session: AsyncSession,
        obj: schemas.ClipAnnotation,
        tag: schemas.Tag,
        user: schemas.SimpleUser | None = None,
    ) -> schemas.ClipAnnotation:
        """Add a tag to a clip annotation.

        Parameters
        ----------
        session : AsyncSession
            The database session.
        obj : schemas.ClipAnnotation
            The clip annotation to add the tag to.
        tag : schemas.Tag
            The tag to add.
        user : schemas.SimpleUser, optional
            The user adding the tag, by default None

        Returns
        -------
        schemas.ClipAnnotation
            The updated clip annotation.

        Raises
        ------
        exceptions.NotFoundError
            If the clip annotation or tag do not exist.
        """
        user_id = user.id if user else None

        for t in obj.tags:
            if (t.id == tag.id) and (t.created_by_id == user_id):
                raise exceptions.DuplicateObjectError(
                    f"Tag {tag.id} already exists in clip annotation {obj.id}."
                )

        db_tag = await common.create_object(
            session=session,
            model=models.ClipAnnotationTag,
            data=schemas.ClipAnnotationTagCreate(
                annotation_id=obj.id,
                tag_id=tag.id,
                created_by_id=user_id,
            ),
        )

        obj = obj.model_copy(
            update=dict(
                tags=[
                    *obj.tags,
                    schemas.ClipAnnotationTag.model_validate(db_tag),
                ],
            )
        )
        self._update_cache(obj)
        return obj

    async def add_note(
        self,
        session: AsyncSession,
        obj: schemas.ClipAnnotation,
        note: schemas.Note,
    ) -> schemas.ClipAnnotation:
        """Add a note to a clip annotation.

        Parameters
        ----------
        session
            The database session.
        obj
            The clip annotation to add the note to.
        note
            The note to add.

        Returns
        -------
        schemas.ClipAnnotation
            The updated clip annotation.

        Raises
        ------
        exceptions.NotFoundError
            If the clip annotation or note do not exist.
        """
        for n in obj.notes:
            if n.id == note.id:
                raise exceptions.DuplicateObjectError(
                    f"Note {note} already exists in clip annotation {obj}."
                )

        db_note = await common.create_object(
            session=session,
            model=models.ClipAnnotationNote,
            data=schemas.ClipAnnotationNoteCreate(
                annotation_id=obj.id,
                note_id=note.id,
            ),
        )

        obj = obj.model_copy(
            update=dict(
                notes=[
                    *obj.notes,
                    schemas.ClipAnnotationNote.model_validate(db_note),
                ],
            )
        )
        self._update_cache(obj)
        return obj

    async def remove_tag(
        self,
        session: AsyncSession,
        obj: schemas.ClipAnnotation,
        tag: schemas.Tag,
        user: schemas.SimpleUser | None = None,
    ) -> schemas.ClipAnnotation:
        """Remove a tag from a clip annotation.

        Parameters
        ----------
        session : AsyncSession
            The database session.
        obj : schemas.ClipAnnotation
            The clip annotation to remove the tag from.
        tag : schemas.Tag
            The tag to remove.
        user : schemas.SimpleUser, optional
            If provided, will remove the tag only if it was created by the
            user, by default None

        Returns
        -------
        schemas.ClipAnnotation
            The updated clip annotation.

        Raises
        ------
        exceptions.NotFoundError
            If the clip annotation or tag do not exist.
        """
        user_id = user.id if user else None

        for t in obj.tags:
            if (t.id == tag.id) and (t.created_by_id == user_id):
                await common.delete_object(
                    session=session,
                    model=models.ClipAnnotationTag,
                    condition=models.ClipAnnotationTag.id == t.id,
                )
                break
        else:
            raise exceptions.NotFoundError(
                f"Tag {tag.id} does not exist in clip annotation {obj.id}."
            )

        obj = obj.model_copy(
            update=dict(
                tags=[t for t in obj.tags if t.id != tag.id],
            )
        )
        self._update_cache(obj)
        return obj

    async def remove_note(
        self,
        session: AsyncSession,
        obj: schemas.ClipAnnotation,
        note: schemas.Note,
    ) -> schemas.ClipAnnotation:
        """Remove a note from a clip annotation.

        Parameters
        ----------
        session
            The database session.
        obj
            The clip annotation to remove the note from.
        note
            The note to remove.

        Returns
        -------
        schemas.ClipAnnotation
            The updated clip annotation.

        Raises
        ------
        exceptions.NotFoundError
            If the clip annotation or note do not exist.
        """
        for n in obj.notes:
            if n.id == note.id:
                await common.delete_object(
                    session=session,
                    model=models.ClipAnnotationNote,
                    condition=and_(
                        models.ClipAnnotationNote.clip_annotation_id == obj.id,
                        models.ClipAnnotationNote.note_id == note.id,
                    ),
                )
                break
        else:
            raise exceptions.NotFoundError(
                f"Note {note.id} does not exist in clip annotation {obj.id}."
            )

        obj = obj.model_copy(
            update=dict(
                notes=[n for n in obj.notes if n.id != note.id],
            )
        )
        self._update_cache(obj)
        return obj

    async def from_soundevent(
        self,
        session: AsyncSession,
        data: data.ClipAnnotation,
    ) -> schemas.ClipAnnotation:
        """Create a clip annotation from a sound event.

        Parameters
        ----------
        session : AsyncSession
            The database session.
        data : data.ClipAnnotation
            The clip annotation to create.

        Returns
        -------
        schemas.ClipAnnotation
            The created clip annotation.
        """
        try:
            clip_annotation = await self.get(session, data.uuid)
            return await self._update_from_soundevent(
                session,
                clip_annotation,
                data,
            )
        except exceptions.NotFoundError:
            pass

        return await self._create_from_soundevent(session, data)

    def to_soundevent(
        self,
        clip_annotation: schemas.ClipAnnotation,
    ) -> data.ClipAnnotation:
        """Convert a clip annotation to a soundevent object.

        Parameters
        ----------
        clip_annotation : schemas.ClipAnnotation
            The clip annotation to convert.

        Returns
        -------
        data.ClipAnnotation
            The converted object in the soundevent format.
        """
        se_clip = clips.to_soundevent(clip_annotation.clip)
        se_sound_events = [
            sound_event_annotations.to_soundevent(
                annotation,
            )
            for annotation in clip_annotation.sound_events
        ]
        se_tags = [tags.to_soundevent(tag.tag) for tag in clip_annotation.tags]
        se_notes = [
            notes.to_soundevent(note) for note in clip_annotation.notes
        ]

        return data.ClipAnnotation(
            uuid=clip_annotation.uuid,
            created_on=clip_annotation.created_on,
            clip=se_clip,
            sound_events=se_sound_events,
            tags=se_tags,
            notes=se_notes,
        )

    async def _update_from_soundevent(
        self,
        session: AsyncSession,
        clip_annotation: schemas.ClipAnnotation,
        data: data.ClipAnnotation,
    ) -> schemas.ClipAnnotation:
        """Update a clip annotation from a sound event.

        Parameters
        ----------
        session : AsyncSession
            The database session.
        clip_annotation : models.ClipAnnotation
            The clip annotation to update.
        data : data.ClipAnnotation
            The clip annotation data to update with.

        Returns
        -------
        schemas.ClipAnnotation
            The updated clip annotation.
        """
        if not clip_annotation.uuid == data.uuid:
            raise ValueError("The UUID's do not match.")

        tag_keys = {(t.tag.key, t.tag.value) for t in clip_annotation.tags}
        note_keys = {n.uuid for n in clip_annotation.notes}

        for se_tag in data.tags:
            if (se_tag.key, se_tag.value) in tag_keys:
                continue

            tag = await tags.from_soundevent(session, se_tag)
            clip_annotation = await self.add_tag(
                session,
                clip_annotation,
                tag,
            )

        for se_note in data.notes:
            if se_note.uuid in note_keys:
                continue

            note = await notes.from_soundevent(session, se_note)
            clip_annotation = await self.add_note(
                session,
                clip_annotation,
                note,
            )

        for sound_event in data.sound_events:
            await sound_event_annotations.from_soundevent(
                session,
                sound_event,
                clip_annotation,
            )

        return clip_annotation

    async def _create_from_soundevent(
        self,
        session: AsyncSession,
        data: data.ClipAnnotation,
    ) -> schemas.ClipAnnotation:
        """Create a clip annotation from a sound event.

        Parameters
        ----------
        session : AsyncSession
            The database session.
        data : data.ClipAnnotation
            The clip annotation to create.

        Returns
        -------
        schemas.ClipAnnotation
            The created clip annotation.
        """
        clip = await clips.from_soundevent(session, data.clip)
        clip_annotation = await self.create(
            session,
            schemas.ClipAnnotationCreate(
                uuid=data.uuid,
                clip_id=clip.id,
                created_on=data.created_on,
            ),
        )

        for se_tag in data.tags:
            tag = await tags.from_soundevent(session, se_tag)
            clip_annotation = await self.add_tag(
                session,
                clip_annotation,
                tag,
            )

        for se_note in data.notes:
            note = await notes.from_soundevent(session, se_note)
            clip_annotation = await self.add_note(
                session,
                clip_annotation,
                note,
            )

        for sound_event in data.sound_events:
            await sound_event_annotations.from_soundevent(
                session,
                sound_event,
                clip_annotation,
            )

        return clip_annotation


clip_annotations = ClipAnnotationAPI()
