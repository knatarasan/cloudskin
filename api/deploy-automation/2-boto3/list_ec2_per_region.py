import json

import boto3

# Replace <region-name> with the name of the AWS region you want to view the instance types for
ec2_client = boto3.client("ec2", region_name="us-east-1")

response = ec2_client.describe_instance_types()

with open("ec2_instance.json", "w") as file:
    json.dump(response, file)


instance_types = [instance_type["InstanceType"] for instance_type in response["InstanceTypes"]]

print(instance_types)
