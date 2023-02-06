import boto3

client = boto3.client("ec2")
response = client.describe_instance_types()
instance_types = response["InstanceTypes"]
for instance_type in instance_types:
    print(instance_type["InstanceType"])


