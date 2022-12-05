import boto3

AWS_ACCESS_KEY_ID="PLACEHOLDER"
AWS_SECRET_ACCESS_KEY="PLACEHOLDER"

ec2 = boto3.resource(
    'ec2',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
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

# The Subnet and Security Group should be in the default VPC, if you do not want to create a new VPC

# This is the response for the above code
'''
(cloudskin) iniyan@iniyans-MacBook-Pro 2-boto3 % aws ec2 describe-instances --region us-west-1 --query 'Reservations[].Instances[].[InstanceId,Tags[]]' --output text --filters Name=instance-state-name,Values=running
i-09f110d1dccb60681     None
'''

# Used this resource: https://blog.knoldus.com/how-to-create-ec2-instance-using-python3-with-boto3/

# ARN for created user: arn:aws:iam::334431854769:user/resource-manager
# Create IAM user and attach this policy:
'''
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:RunInstances",
                "ec2:TerminateInstances",
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateTags",
                "ec2:DescribeInstances",
                "ec2:DescribeInstanceStatus",
                "ec2:DescribeAddresses",
                "ec2:AssociateAddress",
                "ec2:DisassociateAddress",
                "ec2:DescribeRegions",
                "ec2:DescribeAvailabilityZones"
            ],
            "Resource": "*"
        }
    ]
}
'''