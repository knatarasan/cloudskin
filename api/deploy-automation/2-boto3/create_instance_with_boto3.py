import boto3

ec2 = boto3.resource('ec2')

instances = ec2.create_instances(
    ImageId="ami-0f5e8a042c8bfcd5e",
    MinCount=1,
    MaxCount=1,
    InstanceType="t2.micro",
    KeyName="InstanceKeyPair",
    SecurityGroupIds=['sg-0f2b88c10abf752e3'],
    SubnetId='subnet-0a6da46fb837b5a32'
)

# The Subnet and Security Group should be in the default VPC, if you do not want to create a new VPC

# This is the response for the above code
'''
(cloudskin) iniyan@iniyans-MacBook-Pro 2-boto3 % aws ec2 describe-instances --region us-west-1 --query 'Reservations[].Instances[].[InstanceId,Tags[]]' --output text --filters Name=instance-state-name,Values=running
i-09f110d1dccb60681     None
'''

# Used this resource: https://blog.knoldus.com/how-to-create-ec2-instance-using-python3-with-boto3/
