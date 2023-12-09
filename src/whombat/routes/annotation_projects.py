"""REST API routes for annotation projects."""
from uuid import UUID

from fastapi import APIRouter, Depends, UploadFile
from soundevent import data
from soundevent.io import aoef

from whombat import api, schemas
from whombat.dependencies import Session
from whombat.filters.annotation_projects import AnnotationProjectFilter
from whombat.routes.types import Limit, Offset

__all__ = [
    "annotation_projects_router",
]


annotation_projects_router = APIRouter()


@annotation_projects_router.get(
    "/",
    response_model=schemas.Page[schemas.AnnotationProject],
)
async def get_annotation_projects(
    session: Session,
    limit: Limit = 10,
    offset: Offset = 0,
    filter: AnnotationProjectFilter = Depends(AnnotationProjectFilter),  # type: ignore
):
    """Get a page of annotation projects."""
    projects, total = await api.annotation_projects.get_many(
        session,
        limit=limit,
        offset=offset,
        filters=[filter],
    )
    return schemas.Page(
        items=projects,
        total=total,
        limit=limit,
        offset=offset,
    )


@annotation_projects_router.post(
    "/",
    response_model=schemas.AnnotationProject,
)
async def create_annotation_project(
    session: Session,
    data: schemas.AnnotationProjectCreate,
):
    """Create an annotation project."""
    annotation_project = await api.annotation_projects.create(
        session,
        name=data.name,
        description=data.description,
        annotation_instructions=data.annotation_instructions,
    )
    await session.commit()
    return annotation_project


@annotation_projects_router.get(
    "/detail/",
    response_model=schemas.AnnotationProject,
)
async def get_annotation_project(
    session: Session,
    annotation_project_uuid: UUID,
):
    """Get an annotation project."""
    return await api.annotation_projects.get(session, annotation_project_uuid)


@annotation_projects_router.patch(
    "/detail/",
    response_model=schemas.AnnotationProject,
)
async def update_annotation_project(
    session: Session,
    annotation_project_uuid: UUID,
    data: schemas.AnnotationProjectUpdate,
):
    """Update an annotation project."""
    annotation_project = await api.annotation_projects.get(
        session,
        annotation_project_uuid,
    )
    annotation_project = await api.annotation_projects.update(
        session,
        annotation_project,
        data,
    )
    await session.commit()
    return annotation_project


@annotation_projects_router.delete(
    "/detail/",
    response_model=schemas.AnnotationProject,
)
async def delete_annotation_project(
    session: Session,
    annotation_project_uuid: UUID,
):
    """Delete an annotation project."""
    annotation_project = await api.annotation_projects.get(
        session,
        annotation_project_uuid,
    )
    project = await api.annotation_projects.delete(session, annotation_project)
    await session.commit()
    return project


@annotation_projects_router.post(
    "/detail/tags/",
    response_model=schemas.AnnotationProject,
)
async def add_tag_to_annotation_project(
    session: Session,
    annotation_project_uuid: UUID,
    key: str,
    value: str,
):
    """Add a tag to an annotation project."""
    annotation_project = await api.annotation_projects.get(
        session,
        annotation_project_uuid,
    )
    tag = await api.tags.get(session, (key, value))
    project = await api.annotation_projects.add_tag(
        session,
        annotation_project,
        tag,
    )
    await session.commit()
    return project


@annotation_projects_router.delete(
    "/detail/tags/",
    response_model=schemas.AnnotationProject,
)
async def remove_tag_from_annotation_project(
    session: Session,
    annotation_project_uuid: UUID,
    key: str,
    value: str,
):
    """Remove a tag from an annotation project."""
    annotation_project = await api.annotation_projects.get(
        session,
        annotation_project_uuid,
    )
    tag = await api.tags.get(session, (key, value))
    project = await api.annotation_projects.remove_tag(
        session,
        annotation_project,
        tag,
    )
    await session.commit()
    return project


@annotation_projects_router.post(
    "/import/",
    response_model=schemas.AnnotationProject,
)
async def import_annotation_project(
    session: Session,
    annotation_project: UploadFile,
):
    """Import an annotation project."""
    obj = aoef.AOEFObject.model_validate_json(annotation_project.file.read())
    ann_proj: data.AnnotationProject = aoef.to_soundevent(obj)  # type: ignore
    imported = await api.annotation_projects.from_soundevent(session, ann_proj)
    await session.commit()
    return imported
