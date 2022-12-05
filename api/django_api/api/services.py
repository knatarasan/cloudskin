import boto3


class EC2:
    def __init__(self):
        self.AWS_ACCESS_KEY_ID = 'PLACEHOLDER'
        self.AWS_SECRET_ACCESS_KEY = "PLACEHOLDER"

    def create(self):
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
        print("CREATED INSTANCE", instances[0].instance_id)
        return instances[0].instance_id
