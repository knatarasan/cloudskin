import logging

import boto3
from django.conf import settings
from django.db import models

from .aws_network import VPC
from .AWSComponent import AWSComponent
from .AwsCreds import RSA, AwsCreds
from .InstallableService import InstallableService
from .InstalledService import InstalledService

logger = logging.getLogger(__name__)


class RDS(AWSComponent):
    """
    Model inheritance. Ref : https://docs.djangoproject.com/en/4.1/topics/db/models/#model-inheritance
    """

    aws_component = models.TextField(default="rds")
    rds_resource_id = models.TextField(null=True)
    rds_endpoint = models.TextField(null=True)
    rds_port = models.IntegerField(null=True)
    rds_status = models.IntegerField(choices=AWSComponent.AWSCompStatus.choices, default=AWSComponent.AWSCompStatus.PREPARED)
    rds_engine = models.TextField(default="PostgreSQL")
    rds_engine_version = models.TextField(default="14.7")
    rds_instance_class = models.TextField(default="db.t2.micro")
    rds_allocated_storage = models.IntegerField(default=5)
    rds_db_name = models.TextField(default="rdsdatabase")
    rds_master_username = models.TextField(default="postgres")
    rds_master_user_password = models.TextField(default="postgres")
    rds_security_group = models.TextField(null=True)
    rds_subnet1 = models.TextField(null=True)
    rds_subnet2 = models.TextField(null=True)
    rds_arn = models.TextField(null=True)

    def get_aws_creds(self):
        rsa_local = RSA()

        AWS_ACCESS_KEY_ID = rsa_local.decrypt(AwsCreds.objects.get(owner=self.plan.owner).aws_access_key_en)
        AWS_SECRET_ACCESS_KEY = rsa_local.decrypt(AwsCreds.objects.get(owner=self.plan.owner).aws_access_secret_en)

        return AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

    def create_rds_instance(self) -> str:
        # Retrive plan since plan has owner
        logger.debug(f"Plan {self.plan} owner {self.plan.owner} ")

        AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY = self.get_aws_creds()

        logger.info(f"AWS_TEST_MODE=={settings.AWS_TEST_MODE}")
        if settings.AWS_TEST_MODE:
            logger.info(
                f" AWS_TEST_MODE is {settings.AWS_TEST_MODE} no real instance spun, but a simulated instnace. To change this, update AWS_TEST_MODE in settings.base"
            )
            self.ec2_instance_id = "i-simulated-id"
            self.save()
            return "i-simulated-id"

        else:
            logger.info(f"AWS_TEST_MODE is {settings.AWS_TEST_MODE}: INSTNACE WILL BE SPUN")

            try:
                ec2 = boto3.resource(
                    "ec2",
                    aws_access_key_id=AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                    region_name=self.region,
                )
                logger.info(
                    f"Image id {self.image_id} Instance type {self.instance_type} security group {self.security_group} subnet {self.subnet} "
                )

                instances = ec2.create_instances(
                    ImageId=self.image_id,
                    MinCount=1,
                    MaxCount=1,
                    InstanceType=self.instance_type,
                    KeyName=self.instance_key_pair,
                    # SecurityGroupIds=[self.security_group],
                    # SubnetId=self.subnet,
                )
                self.ec2_instance_id = instances[0].instance_id
                logger.debug(f"Instance created waiting to boot up {instances[0]} ")
                # instances[0].wait_until_running()     # Needn't wait ip is requested later
                self.private_ip = instances[0].private_ip_address
                logger.debug(f"Wating for public IP assignment {instances} ")
                # instances[0].wait_until_exists()
                self.public_ip = instances[0].public_ip_address
                self.host_name = instances[0].public_dns_name
                self.ec2_status = AWSComponent.AWSCompStatus.running
                self.save()
                return instances[0].instance_id

            except Exception as e:
                logger.error(f"Instance not created, check ERROR {e}")
                return None
