from datetime import datetime
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

    class EC2Status(models.IntegerChoices):
        PREPARED = 1
        STARTED = 2         # Create Instance
        STOPPED = 3         # Stop Instance
        DELETED = 4         # Delete Instance
        RUNNING = 10
        FAILED = -1
    ec2_status = models.IntegerField(choices=EC2Status.choices, default=EC2Status.PREPARED)

    instance_type = models.TextField(default='t2.micro')
    image_id = models.TextField(default='ami-0f5e8a042c8bfcd5e')
    region = models.TextField(default="us-west-1")
    securityGroup = models.TextField(default="NOT-SET")
    subnet = models.TextField(default="NOT-SET")
    date_created_or_modified = models.DateTimeField(default=datetime.now)


#
# cloud_type : aws
# iam policy (cx supplied)
# aws iam user (this user uses above policy)
# AWS_ACCESS_KEY_ID="PLACEHOLDER"
# AWS_SECRET_ACCESS_KEY="PLACEHOLDER"
# [ AWS Account]
# security_group : hisSecurityGroup
# subnetId : hisSubnet
# region_name=us-west-1
# EC2 instance
# ImageId=ami-0f5e8a042c8bfcd5e
# Instance type (eg: t2.micro)
# RAM
# vCPU


class Plan(models.Model):

    owner = models.ForeignKey(
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

