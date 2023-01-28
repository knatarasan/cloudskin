from .models import Plan
from rest_framework.request import Request
from django.contrib.auth.models import User
import logging
# from aws.models import EC2
from aws.models import AWSComponent

logger = logging.getLogger(__name__)


class PlanDeployment:
    def __init__(self, request: Request, plan: Plan):
        self.plan = plan
        self.cloud_objects: dict = None
        self.user: User = request.user
        logger.debug(f' user type {type(request.user)}')

    def get_cloud_objects(self):
        aws_components = self.plan.aws_components.all()
        for comp in aws_components:
            generic_comp = AWSComponent.objects.get_subclass(id=comp.id)
            logger.debug(f'generic_comp {generic_comp.aws_component}')
            generic_comp.deploy(user=self.user)

        logger.debug(f'aws_componenets {aws_components}')
        self.cloud_objects = {

        }

    def deploy(self):
        logger.debug("DEPLOYMENT STARTED")
