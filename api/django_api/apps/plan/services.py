import logging

from django.contrib.auth.models import User
from rest_framework.request import Request

# from aws.models import EC2
from apps.aws.models.AWSComponent import AWSComponent

from .models import Plan

logger = logging.getLogger(__name__)


class PlanDeployment:
    def __init__(self, request: Request, plan: Plan):
        self.plan = plan
        self.cloud_objects: dict = None
        self.user: User = request.user
        logger.debug(f" user type {type(request.user)}")

    def get_cloud_objects(self):
        aws_components = self.plan.aws_components.all()
        for comp in aws_components:
            generic_comp = AWSComponent.objects.get_subclass(
                id=comp.id
            )  # ref: https://django-model-utils.readthedocs.io/en/latest/managers.html
            logger.debug(f"generic_comp {generic_comp.aws_component}")
            generic_comp.create_aws_instance()

        logger.debug(f"aws_componenets {aws_components}")
        self.cloud_objects = {}

    def deploy(self):
        logger.debug("DEPLOYMENT STARTED")
