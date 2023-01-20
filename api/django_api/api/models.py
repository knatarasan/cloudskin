from datetime import datetime
from django.utils.translation import gettext_lazy as _
from django.db import models
import logging

logger = logging.getLogger(__name__)


# Create your models here.

class AWSComponent(models.Model):
    """
    This is abstract base clas . Ref : https://docs.djangoproject.com/en/4.1/topics/db/models/#abstract-base-classes

    Following namespace issue is handled by

        Error :     api.EC2.plan: (fields.E304) Reverse accessor 'Plan.aws_components' for 'api.EC2.plan' clashes with reverse accessor for 'api.LB.plan'.
                    HINT: Add or change a related_name argument to the definition for 'api.EC2.plan' or 'api.LB.plan'.

    https://stackoverflow.com/questions/2606194/django-error-message-add-a-related-name-argument-to-the-definition
    """
    plan = models.ForeignKey(
        'plan', related_name='aws_components', on_delete=models.PROTECT
        # 'plan', related_name = '%(app_label)s_%(class)s_related', on_delete = models.PROTECT
        # When deleted, the ec2 instances created by the user should be terminated
    )
    region = models.TextField(default="us-west-1")
    securityGroup = models.TextField(default="NOT-SET")
    subnet = models.TextField(default="NOT-SET")
    date_created_or_modified = models.DateTimeField(default=datetime.now)

    class AWSCompStatus(models.IntegerChoices):
        PREPARED = 1
        STARTED = 2  # Create Instance
        STOPPED = 3  # Stop Instance
        DELETED = 4  # Delete Instance
        RUNNING = 10
        FAILED = -1


class EC2(AWSComponent):
    """
    Model inheritance. Ref : https://docs.djangoproject.com/en/4.1/topics/db/models/#model-inheritance
    """
    aws_component = models.TextField(default='ec2')
    ec2_instance_id = models.TextField(null=True)
    ec2_status = models.IntegerField(choices=AWSComponent.AWSCompStatus.choices,
                                     default=AWSComponent.AWSCompStatus.PREPARED)
    instance_type = models.TextField(default='t2.micro')
    image_id = models.TextField(default='ami-0f5e8a042c8bfcd5e')


    def __str__(self):
        return f'id:{str(self.id)}  plan: {str(self.plan)}  id: {self.ec2_instance_id} type:{self.instance_type}  status:{self.ec2_status}'

class LB(AWSComponent):
    aws_component = models.TextField(default='lb')
    lb_instance_id = models.TextField(null=True)
    lb_status = models.IntegerField(choices=AWSComponent.AWSCompStatus.choices,
                                    default=AWSComponent.AWSCompStatus.PREPARED)

    class LBType(models.TextChoices):
        ALB = 'ALB', _('alb')
        NLB = 'NLB', _('nlb')
        GLB = 'GLB', _('glb')

    lb_type = models.TextField(default=LBType.ALB)

    def __str__(self):
        return f'id:{str(self.id)}  plan: {str(self.plan)}  id: {self.lb_instance_id} type:{self.lb_type}  status:{self.lb_status}'


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
