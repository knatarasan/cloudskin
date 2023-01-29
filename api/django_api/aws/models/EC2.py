from .AWSComponent import AWSComponent, AwsCreds
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

    def deploy(self, user):
        logger.debug(f'This will deploy {self.id}')
        return self.create(user)

    def create(self, user):
        AWS_ACCESS_KEY_ID = AwsCreds.objects.get(owner=user).aws_access_key
        AWS_SECRET_ACCESS_KEY = AwsCreds.objects.get(owner=user).aws_access_secret

        logger.info(f"AWS_TEST_MODE=={settings.AWS_TEST_MODE}")
        if settings.AWS_TEST_MODE:
            logger.info("This is AWS_TEST_MODE , no instance is spun. To change this, update AWS_TEST_MODE in settings.base")
            return "i-simulated-id"
        else:
            logger.info(f"IN PRODUCTION MODE: INSTNACE WILL BE SPUN")
            try:
                ec2 = boto3.resource(
                    'ec2',
                    aws_access_key_id=AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                    region_name=self.region
                )
                logger.info(f"Image id {self.image_id} Instance type {self.instance_type} security group {self.security_group} subnet {self.subnet} ")

                instances = ec2.create_instances(
                    ImageId=self.image_id,
                    MinCount=1,
                    MaxCount=1,
                    InstanceType=self.instance_type,
                    KeyName="InstanceKeyPair",
                    SecurityGroupIds=[self.security_group],
                    SubnetId=self.subnet
                )
                logger.info(f"Instance created, Instance id: {instances[0].instance_id}")
                self.ec2_instance_id = instances[0].instance_id
                self.save()
                return instances[0].instance_id


            except Exception as e:
                logger.error(f"Instance not created, check ERROR {e}")
                return None

    def get_health(self, instance_id):
        self.ec2 = boto3.resource(
            'ec2',
            aws_access_key_id=self.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=self.AWS_SECRET_ACCESS_KEY,
            region_name="us-west-1"
        )
        instance = self.ec2.Instance(f"{instance_id}")
        return instance.meta.client.describe_instance_status()['InstanceStatuses']

    def __str__(self):
        return f'id:{str(self.id)}  plan: {str(self.plan)}  id: {self.ec2_instance_id} type:{self.instance_type}  status:{self.ec2_status}'
