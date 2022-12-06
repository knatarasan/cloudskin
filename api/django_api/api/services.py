import boto3
from .models import AwsCreds
import logging
logger = logging.getLogger('django')


class EC2:
    def __init__(self):
        self.AWS_ACCESS_KEY_ID = AwsCreds.objects.get(pk=1).aws_access_key
        self.AWS_SECRET_ACCESS_KEY = AwsCreds.objects.get(pk=1).aws_access_secret
        logger.info(f"AWS_SECRET_KEY: {self.AWS_ACCESS_KEY_ID} {self.AWS_SECRET_ACCESS_KEY}")

    def create(self):
        try:
            ec2 = boto3.resource(
                'ec2',
                aws_access_key_id=self.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=self.AWS_SECRET_ACCESS_KEY,
                region_name="us-west-1"
            )
            instances = ec2.create_instances(
                ImageId="ami-0f5e8a042c8bfcd5e",
                MinCount=1,
                MaxCount=1,
                InstanceType="t2.micro",
                KeyName="InstanceKeyPair",
                SecurityGroupIds=['sg-0f2b88c10abf752e3'],
                SubnetId='subnet-0a6da46fb837b5a32'
            )
            logger.info("Instance created, Instance id: ",
                        instances[0].instance_id)
            return instances[0].instance_id

        except:
            logger.info(
                "Instance not created, check credentials supplied to aws")
            return None
