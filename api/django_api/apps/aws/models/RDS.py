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
    rds_arn = models.TextField(null=True)
    rds_db_identifier = models.TextField(null=True)
    rds_endpoint = models.TextField(null=True)
    rds_port = models.IntegerField(null=True)
    rds_status = models.IntegerField(choices=AWSComponent.AWSCompStatus.choices, default=AWSComponent.AWSCompStatus.PREPARED)
    rds_engine = models.TextField(default="PostgreSQL")
    rds_engine_version = models.TextField(default="14.7")
    rds_instance_class = models.TextField(default="db.t3.micro")
    rds_allocated_storage = models.IntegerField(default=5)
    rds_db_name = models.TextField(default="rdsdatabase")
    rds_master_username = models.TextField(default="postgres")
    rds_master_user_password = models.TextField(default="postgres")
    rds_availability_zone = models.TextField(default="us-east-1b")
    rds_arn = models.TextField(null=True)

    def get_aws_creds(self):
        rsa_local = RSA()

        AWS_ACCESS_KEY_ID = rsa_local.decrypt(AwsCreds.objects.get(owner=self.plan.owner).aws_access_key_en)
        AWS_SECRET_ACCESS_KEY = rsa_local.decrypt(AwsCreds.objects.get(owner=self.plan.owner).aws_access_secret_en)

        return AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

    def create(self) -> str:
        # Retrive plan since plan has owner
        logger.debug(f"Plan {self.plan} owner {self.plan.owner} ")

        AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY = self.get_aws_creds()

        logger.info(f"AWS_TEST_MODE=={settings.AWS_TEST_MODE}")
        if settings.AWS_TEST_MODE:
            logger.info(
                f" AWS_TEST_MODE is {settings.AWS_TEST_MODE} no real instance spun, but a simulated instnace. To change this, update AWS_TEST_MODE in settings.base"
            )
            self.rds_arn = "my-rds-arn"
            self.save()
            return "my-rds-arn"

        else:
            logger.info(f"AWS_TEST_MODE is {settings.AWS_TEST_MODE}: INSTNACE WILL BE SPUN")

            try:
                session = boto3.Session(
                    aws_access_key_id=AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                    region_name="us-east-1",
                )

                rds_client = session.client("rds")

                rds_params = {
                    "DBInstanceIdentifier": self.rds_db_identifier,
                    "DBInstanceClass": self.rds_instance_class,
                    "Engine": self.rds_engine,
                    "EngineVersion": self.rds_engine_version,
                    "MasterUsername": self.rds_master_username,
                    "MasterUserPassword": self.rds_master_user_password,
                    "AllocatedStorage": self.rds_allocated_storage,
                    # "VpcSecurityGroupIds": [self.security_group],
                    "AvailabilityZone": self.rds_availability_zone,
                    "DBName": self.rds_db_name,
                    # Add more parameters as needed
                }

                response = rds_client.create_db_instance(**rds_params)
                logger.debug(f"RDS Database created waiting to boot up {response} ")
                # instances[0].wait_until_running()     # Needn't wait ip is requested later
                self.rds_arn = response["DBInstance"]["DBInstanceArn"]
                self.rds_resource_id = response["DBInstance"]["DbiResourceId"]
                # self.rds_endpoint = response.DBInstance.Endpoint.Address
                # self.rds_port = response.DBInstance.Endpoint.Port
                self.rds_status = AWSComponent.AWSCompStatus.running

                # instances[0].wait_until_exists()

                self.save()
                return response["DBInstance"]["DBInstanceArn"]

            except Exception as e:
                logger.error(f"Instance not created, check ERROR {e}")
                return None

    def update_instance_details(self):
        AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY = self.get_aws_creds()

        if self.rds_arn:
            try:
                session = boto3.Session(
                    aws_access_key_id=AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                    region_name="us-east-1",
                )

                # Create an RDS client
                rds_client = session.client("rds")

                # Retrieve the RDS instance details using the client
                instance = rds_client.describe_db_instances(DBInstanceIdentifier=self.rds_db_identifier)["DBInstances"][0]

                self.rds_endpoint = instance["Endpoint"]["Address"]
                self.rds_port = instance["Endpoint"]["Port"]
                self.security_group = (
                    instance["VpcSecurityGroups"][0]["VpcSecurityGroupId"] if instance["VpcSecurityGroups"] else None
                )
                self.subnet = instance["DBSubnetGroup"]["Subnets"][0]["SubnetIdentifier"]
                self.subnet2 = instance["DBSubnetGroup"]["Subnets"][1]["SubnetIdentifier"]

                # process network details
                _vpc_id = instance["DBSubnetGroup"]["VpcId"]
                # _subnet_id = instance.subnet_id
                # _security_group_id = instance.security_groups[0]["GroupId"] if instance.security_groups else None

                # Get or create VPC object
                try:
                    vpc = VPC.objects.get(vpc_id=_vpc_id)
                except VPC.DoesNotExist:
                    # vpc = VPC.objects.create(vpc_id=_vpc_id, plan=self.plan)
                    pass

                # vpc_boto3 = ec2_boto3.Vpc(_vpc_id)
                # vpc.update_vpc_details(vpc_boto3, ec2_boto3.subnets.all())

                self.save()

            except Exception as e:
                logger.error(f"Instance not found, check ERROR {e}")
                return None

            return instance
        else:
            logger.error(f"Instance id not found for {self} ")
            return None
