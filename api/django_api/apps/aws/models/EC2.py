from .InstallableService import InstallableService
from .InstalledService import InstalledService

from .AWSComponent import AWSComponent
from .AwsCreds import AwsCreds
import boto3
from django.db import models
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


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
    instance_key_pair = models.TextField(default="cloudskin_key")
    public_ip = models.TextField(null=True)
    private_ip = models.TextField(null=True)
    host_name = models.TextField(null=True)

    def create_aws_instance(self):
        # Retrive plan since plan has owner
        logger.debug(f"Plan {self.plan} owner {self.plan.owner} ")
        AWS_ACCESS_KEY_ID = AwsCreds.objects.get(owner=self.plan.owner).aws_access_key
        AWS_SECRET_ACCESS_KEY = AwsCreds.objects.get(owner=self.plan.owner).aws_access_secret

        logger.info(f"AWS_TEST_MODE=={settings.AWS_TEST_MODE}")
        if settings.AWS_TEST_MODE:
            logger.info(
                f" AWS_TEST_MODE is {settings.AWS_TEST_MODE} no real instance spun, but a simulated instnace. To change this, update AWS_TEST_MODE in settings.base")
            self.ec2_instance_id = 'i-simulated-id'
            self.save()
            return 'i-simulated-id'

        else:
            logger.info(f"AWS_TEST_MODE is {settings.AWS_TEST_MODE}: INSTNACE WILL BE SPUN")

            try:
                ec2 = boto3.resource(
                    'ec2',
                    aws_access_key_id=AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                    region_name=self.region
                )
                logger.info(
                    f"Image id {self.image_id} Instance type {self.instance_type} security group {self.security_group} subnet {self.subnet} ")

                instances = ec2.create_instances(
                    ImageId=self.image_id,
                    MinCount=1,
                    MaxCount=1,
                    InstanceType=self.instance_type,
                    KeyName=self.instance_key_pair,
                    SecurityGroupIds=[self.security_group],
                    SubnetId=self.subnet
                )
                self.ec2_instance_id = instances[0].instance_id
                logger.debug(f"Instance created waiting to boot up {instances[0]} ")
                # instances[0].wait_until_running()     # Needn't wait ip is requested later
                self.private_ip = instances[0].private_ip_address
                logger.debug(f"Wating for public IP assignment {instances} ")
                # instances[0].wait_until_exists()
                self.public_ip = instances[0].public_ip_address
                self.host_name = instances[0].public_dns_name
                self.ec2_status = AWSComponent.AWSCompStatus.RUNNING
                self.save()
                return instances[0].instance_id

            except Exception as e:
                logger.error(f"Instance not created, check ERROR {e}")
                return None

    def update_instance_details(self):

        AWS_ACCESS_KEY_ID = AwsCreds.objects.get(owner=self.plan.owner).aws_access_key
        AWS_SECRET_ACCESS_KEY = AwsCreds.objects.get(owner=self.plan.owner).aws_access_secret

        ec2 = boto3.resource(
            'ec2',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name="us-west-1"
        )

        instance_details = ec2.meta.client.describe_instances(InstanceIds=[self.ec2_instance_id])
        self.public_ip = instance_details["Reservations"][0]["Instances"][0].get("PublicIpAddress", "Not Assigned")
        self.private_ip = instance_details["Reservations"][0]["Instances"][0].get("PrivateIpAddress", "Not Assigned")
        self.host_name = instance_details["Reservations"][0]["Instances"][0].get("PublicDnsName", "Not Assigned")
        self.save()

        return instance_details["Reservations"][0]["Instances"][0]

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
        return f'id:{str(self.id)}  plan: {str(self.plan)}  id: {self.ec2_instance_id} type:{self.instance_type}  status:{self.ec2_status}'

    def terminate_aws_instance(self):
        AWS_ACCESS_KEY_ID = AwsCreds.objects.get(owner=self.plan.owner).aws_access_key
        AWS_SECRET_ACCESS_KEY = AwsCreds.objects.get(owner=self.plan.owner).aws_access_secret

        logger.info(f"AWS_TEST_MODE=={settings.AWS_TEST_MODE}")
        if settings.AWS_TEST_MODE:
            logger.info(f" AWS_TEST_MODE is {settings.AWS_TEST_MODE} no real instance would be removed")

        else:
            logger.info(f"AWS_TEST_MODE is {settings.AWS_TEST_MODE}: INSTNACE WILL BE TERMINATED")

            try:
                ec2 = boto3.resource(
                    'ec2',
                    aws_access_key_id=AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                    region_name=self.region
                )

                instance = ec2.Instance(self.ec2_instance_id)
                logger.debug(f"Instance {self.ec2_instance_id} will be terminated ")
                logger.debug(f"Terminating instance {instance.terminate()} ")

                self.ec2_instance_id = None
                self.private_ip = None
                self.public_ip = None
                self.host_name = None
                self.ec2_status = AWSComponent.AWSCompStatus.TERMINATED
                self.save()
                return "Terminated"

            except Exception as e:
                logger.error(f"Instance not created, check ERROR {e}")
                return None
