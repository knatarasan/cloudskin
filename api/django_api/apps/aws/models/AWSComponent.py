import logging
from datetime import datetime

from apps.plan.models import Plan
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from model_utils.managers import InheritanceManager

logger = logging.getLogger(__name__)


class AWSComponent(models.Model):
    """
    This is a base clas which forms one-to-one with child . Ref : https://docs.djangoproject.com/en/4.1/topics/db/models/#abstract-base-classes
    """

    plan = models.ForeignKey(Plan, related_name="aws_components", on_delete=models.PROTECT)
    region = models.TextField(default="us-east-1")
    security_group = models.TextField(null=True)
    subnet = models.TextField(null=True)
    subnet2 = models.TextField(null=True)  # Subnet needs to converted into list
    arn = models.TextField(null=True)
    date_created_or_modified = models.DateTimeField(default=datetime.now(tz=timezone.utc))
    objects = InheritanceManager()

    class AWSCompStatus(models.IntegerChoices):
        PREPARED = -1  # This is specific to SC
        pending = 1  # These are statuses from EC2
        starting = 2
        running = 3
        stopping = 4
        stopped = 5
        shutting_down = 6
        terminated = 7

    def __str__(self):
        return f"ID {self.id} PLAN {self.plan}"


class LB(AWSComponent):
    aws_component = models.TextField(default="lb")
    lb_instance_id = models.TextField(null=True)
    lb_status = models.IntegerField(choices=AWSComponent.AWSCompStatus.choices, default=AWSComponent.AWSCompStatus.PREPARED)

    class LBType(models.TextChoices):
        ALB = "ALB", _("alb")
        NLB = "NLB", _("nlb")
        GLB = "GLB", _("glb")

    lb_type = models.TextField(default=LBType.ALB)

    def deploy(self):
        logger.debug(f"This will deploy {self.id}")

    def __str__(self):
        return (
            f"id:{str(self.id)}  plan: {str(self.plan)}  id: {self.lb_instance_id} type:{self.lb_type}  status:{self.lb_status}"
        )


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
