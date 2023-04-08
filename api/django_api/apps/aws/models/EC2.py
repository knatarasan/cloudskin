import logging

import boto3
from django.conf import settings
from django.db import models

from .AWSComponent import AWSComponent
from .AwsCreds import RSA, AwsCreds
from .InstallableService import InstallableService
from .InstalledService import InstalledService
from .VPC import VPC

logger = logging.getLogger(__name__)


class EC2(AWSComponent):
    """
    Model inheritance. Ref : https://docs.djangoproject.com/en/4.1/topics/db/models/#model-inheritance
    """

    aws_component = models.TextField(default="ec2")
    ec2_instance_id = models.TextField(null=True)
    ec2_status = models.IntegerField(choices=AWSComponent.AWSCompStatus.choices, default=AWSComponent.AWSCompStatus.PREPARED)
    instance_type = models.TextField(default="t2.micro")
    image_id = models.TextField(default="ami-006dcf34c09e50022")
    instance_key_pair = models.TextField(default="cloudskin_key")
    public_ip = models.TextField(null=True)
    private_ip = models.TextField(null=True)
    host_name = models.TextField(null=True)

    def get_aws_creds(self):
        rsa_local = RSA()

        AWS_ACCESS_KEY_ID = rsa_local.decrypt(AwsCreds.objects.get(owner=self.plan.owner).aws_access_key_en)
        AWS_SECRET_ACCESS_KEY = rsa_local.decrypt(AwsCreds.objects.get(owner=self.plan.owner).aws_access_secret_en)

        return AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

    def create_aws_instance(self) -> str:
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

    def update_instance_details(self):
        AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY = self.get_aws_creds()

        ec2_boto3 = boto3.resource(
            "ec2",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=self.region,
        )

        if self.ec2_instance_id:
            try:
                instance = ec2_boto3.Instance(f"{self.ec2_instance_id}")
                self.public_ip = instance.public_ip_address
                self.private_ip = instance.private_ip_address
                self.host_name = instance.public_dns_name
                self.security_group = instance.security_groups[0]["GroupId"] if instance.security_groups else None
                self.subnet = instance.subnet_id

                # process network details
                _vpc_id = instance.vpc_id
                _subnet_id = instance.subnet_id
                _security_group_id = instance.security_groups[0]["GroupId"] if instance.security_groups else None

                vpc = VPC()
                vpc_boto3 = ec2_boto3.Vpc(_vpc_id)
                vpc.update_vpc_details(vpc_boto3)

                self.save()
                self.health()

            except Exception as e:
                logger.error(f"Instance not found, check ERROR {e}")
                return None

            return instance
        else:
            logger.error(f"Instance id not found for {self} ")
            return None

    def health(self):
        """
        TODO
            1. Right now every call to health updates, DB for EC2 model object , it has to be refactored
            2. From Frontend no separate call to health is used, current iteration uses this function from self.update_instance_details
        """
        AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY = self.get_aws_creds()

        ec2 = boto3.resource(
            "ec2",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=self.region,
        )
        instance = ec2.Instance(f"{self.ec2_instance_id}")

        if instance.state["Name"] == "stopping":
            self.ec2_status = AWSComponent.AWSCompStatus.stopping
        elif instance.state["Name"] == "stopped":
            self.ec2_status = AWSComponent.AWSCompStatus.stopped
        elif instance.state["Name"] == "starting":
            self.ec2_status = AWSComponent.AWSCompStatus.starting
        elif instance.state["Name"] == "running":
            self.ec2_status = AWSComponent.AWSCompStatus.running
        elif instance.state["Name"] == "terminated":
            self.ec2_status = AWSComponent.AWSCompStatus.terminated
        elif instance.state["Name"] == "shutting-down":
            self.ec2_status = AWSComponent.AWSCompStatus.shutting_down
        else:
            logger.debug(f"Instance state {instance.state['Name']} not handled")
            return None

        self.save()
        return self.ec2_status

    def install_service(self, service_name):
        logger.info(f"Installing service {service_name} on {self.host_name} ")
        installable_service = InstallableService.objects.get(service_name=service_name)
        installed_service = InstalledService.objects.create(ec2=self, installable_service=installable_service)
        installed_service.install_service()
        logger.info(f"Installed service {service_name} on {self.host_name} ")
        return installed_service

    def uninstall_service(self, service_name):
        logger.info(f"Uninstalling service {service_name} on {self.host_name} ")
        installable_service = InstallableService.objects.get(service_name=service_name)
        installed_service = InstalledService.objects.get(ec2=self, installable_service=installable_service)
        result = installed_service.uninstall_service()
        logger.debug(f"Uninstall result {result} ")
        logger.info(f"Before deleting model installed_service :  {installed_service} ")
        installed_service.delete()
        logger.info(f"Uninstalled service {service_name} on {self.host_name} ")
        return installed_service

    def __str__(self):
        return f"id:{str(self.id)}  plan: {str(self.plan)}  id: {self.ec2_instance_id} type:{self.instance_type}  status:{self.ec2_status}"

    def terminate_aws_instance(self):
        AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY = self.get_aws_creds()

        logger.info(f"AWS_TEST_MODE=={settings.AWS_TEST_MODE}")
        if settings.AWS_TEST_MODE:
            logger.info(f" AWS_TEST_MODE is {settings.AWS_TEST_MODE} no real instance would be removed")

        else:
            logger.info(f"AWS_TEST_MODE is {settings.AWS_TEST_MODE}: INSTNACE WILL BE TERMINATED")

            try:
                ec2 = boto3.resource(
                    "ec2",
                    aws_access_key_id=AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                    region_name=self.region,
                )

                instance = ec2.Instance(self.ec2_instance_id)
                logger.debug(f"Instance {self.ec2_instance_id} will be terminated ")
                logger.debug(f"Terminating instance {instance.terminate()} ")

                self.ec2_instance_id = None
                self.private_ip = None
                self.public_ip = None
                self.host_name = None
                self.ec2_status = AWSComponent.AWSCompStatus.terminated
                self.save()
                return "Terminated"

            except Exception as e:
                logger.error(f"Instance not created, check ERROR {e}")
                return None
