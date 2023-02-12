import boto3

regions = [
    #'ap-east-1',
    "ap-northeast-1",
    "ap-northeast-2",
    "ap-south-1",
    "ap-southeast-1",
    "ap-southeast-2",
    "ca-central-1",
    "eu-central-1",
    "eu-north-1",
    "eu-west-1",
    "eu-west-2",
    "eu-west-3",
    #'me-south-1',
    "sa-east-1",
    "us-east-1",
    "us-east-2",
    "us-west-1",
    "us-west-2",
]

#  for region_name in regions:
#     print(f'region_name: {region_name}')
#     ec2= boto3.resource('ec2', region_name=region_name)
#     instances= ec2.meta.client.describe_instances()
#     for instance in instances['Reservations']:
#         print(instance)

region_name = "us-west-1"
print(f"region_name: {region_name}")
ec2 = boto3.resource("ec2", region_name=region_name)
instances = ec2.meta.client.describe_instances()
for instance in instances["Reservations"]:
    print(instance)
