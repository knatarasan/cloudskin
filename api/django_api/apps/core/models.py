from django.db import models
from django_currentuser.db.models import CurrentUserField


class RecordStatus(models.IntegerChoices):
    ACTIVE = 1, "Active"
    INACTIVE = 2, "InActive"


class BaseModel(models.Model):
    record_status = models.PositiveSmallIntegerField(
        null=False, blank=True, choices=RecordStatus.choices, default=RecordStatus.ACTIVE
    )
    created_datetime = models.DateTimeField(auto_now_add=True)
    created_by = CurrentUserField(
        on_delete=models.PROTECT,
        related_name="+",  # Do not to create a backwards relation
        db_index=False,
    )  # type: ignore
    last_modified_datetime = models.DateTimeField(auto_now=True, null=True, blank=True)
    last_modified_by = CurrentUserField(
        on_update=True,
        on_delete=models.PROTECT,
        related_name="+",  # Do not to create a backwards relation
        db_index=False,
    )  # type: ignore

    class Meta:
        abstract = True
