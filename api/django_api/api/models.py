from enum import Enum

from django.db import models
import logging

logger = logging.getLogger(__name__)

# Create your models here.

class EC2(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='ec2', on_delete=models.CASCADE # When deleted, the ec2 instances created by the user should be terminated
    )
    ec2_instance_id = models.TextField(null=True)

class Plan(models.Model):

class Plan(models.Model):

    owner = models.ForeignKey(
        'auth.User', related_name='plan', on_delete=models.CASCADE
        'auth.User', related_name='plan', on_delete=models.CASCADE
    )
    plan = models.JSONField()

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
        logger.info(f'val of deploy_stat {self.deploy_status}')
        super().save(*args, **kwargs)


class AwsCreds(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='aws_creds', on_delete=models.CASCADE
    )
    aws_access_key = models.TextField()
    aws_access_secret = models.TextField()

