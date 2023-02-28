import logging
import uuid

from apps.core.models import BaseModel
from django.db import models

logger = logging.getLogger(__name__)


class Plan(BaseModel):
    plan_id = models.AutoField(primary_key=True)
    plan_no = models.TextField(unique=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey("auth.User", related_name="plan", on_delete=models.CASCADE)
    plan = models.JSONField(null=True)

    class DeployStatus(models.IntegerChoices):
        PREPARED = 1
        DEPLOYED = 2
        FAILED = 0

    deploy_status = models.IntegerField(choices=DeployStatus.choices, null=True)

    class RunningStatus(models.IntegerChoices):
        STARTED = 1
        RUNNING = 2
        STOPPED = 3
        FAILED = 0

    running_status = models.IntegerField(choices=RunningStatus.choices, null=True)

    def save(self, *args, **kwargs):
        logger.info(f"val of deploy_stat {self.deploy_status}")
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-last_modified_datetime"]
