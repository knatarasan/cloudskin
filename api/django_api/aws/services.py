import boto3
# from .models import AwsCreds
import logging
from django.conf import settings

logger = logging.getLogger(__name__)


class EC2Service:
    def __init__(self, ec2_model, user, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY):
        self.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID
        self.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY
        self.ec2 = None
        self.ec2_model = ec2_model
        logger.debug(f"Model {ec2_model} aws_key {self.AWS_ACCESS_KEY_ID}")

    def create(self):
        logger.info(f"DEVELOPMENT MODE=={settings.DEVELOPMENT_MODE}")
        if settings.DEVELOPMENT_MODE:
            logger.info("This is DEVELOPMENT MODE, no instance is spun. To change this, update .env file")
            return "i-simulated-id"
        else:
            logger.info("In prodution mode; Instance will be spun")
            try:
                self.ec2 = boto3.resource(
                    'ec2',
                    aws_access_key_id=self.AWS_ACCESS_KEY_ID,
                    aws_secret_access_key=self.AWS_SECRET_ACCESS_KEY,
                    region_name="us-west-1"
                )

                instances = self.ec2.create_instances(
                    ImageId=self.ec2_model.image_id,
                    MinCount=1,
                    MaxCount=1,
                    InstanceType=self.ec2_model.instance_type,
                    KeyName="InstanceKeyPair",
                    # ImageId="ami-0f5e8a042c8bfcd5e",
                    # MinCount=1,
                    # MaxCount=1,
                    # InstanceType="t2.micro",
                    # KeyName="InstanceKeyPair",
                    # SecurityGroupIds=['sg-0f2b88c10abf752e3'],
                    # SubnetId='subnet-0a6da46fb837b5a32'
                )
                logger.info(f"Instance created, Instance id: {instances[0].instance_id}")
                # time.sleep(30)

                # for status in ec2.meta.client.describe_instance_status()['InstanceStatuses']:
                #     logger.info(f'STATUS {status}')

                # return instances[0].instance_id
                return instances[0].instance_id


            except:
                logger.info(
                    "Instance not created, check credentials supplied to aws")
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
