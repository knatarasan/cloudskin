import logging
import uuid

from django.conf import settings
from django.db import models

from apps.core.models import BaseModel

logger = logging.getLogger(__name__)


class DeployStatus(models.IntegerChoices):
    PREPARED = 1
    INPROGRESS = 2
    DEPLOYED = 3
    FAILED = 0


class RunningStatus(models.IntegerChoices):
    STARTED = 1
    RUNNING = 2
    STOPPED = 3
    FAILED = 0


class Plan(BaseModel):
    plan_id = models.AutoField(primary_key=True)
    plan_no = models.TextField(unique=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="+", db_index=False)
    data = models.JSONField(null=True)
    deploy_status = models.IntegerField(choices=DeployStatus.choices, null=True)
    running_status = models.IntegerField(choices=RunningStatus.choices, null=True)

    class Meta:
        db_table = "plan"
        ordering = ["-last_modified_datetime"]
