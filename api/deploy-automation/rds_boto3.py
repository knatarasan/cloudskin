import boto3

session = boto3.Session(
    aws_access_key_id="AKIA2RY4I3GG2RBPUM6F",
    aws_secret_access_key="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",
    region_name="us-east-1",
)

rds_client = session.client("rds")

rds_params = {
    "DBInstanceIdentifier": "my-rds-instance",
    "DBInstanceClass": "db.t3.micro",
    "Engine": "postgres",
    "EngineVersion": "14.7",
    "MasterUsername": "postgres",
    "MasterUserPassword": "postgres",
    "AllocatedStorage": 5,
    # "VpcSecurityGroupIds": ["sg-09e15ea1f1fc88809"],
    "AvailabilityZone": "us-east-1b",
    "DBName": "rdsdatabase",
    # Add more parameters as needed
}


response = rds_client.create_db_instance(**rds_params)

# print("response", response)


# def get_rds_instance_details(instance_arn):
#     Extract the region from the ARN
#     region = instance_arn.split(":")[3]

#     # Create an RDS resource in the specified region
#     rds_resource = boto3.resource("rds", region_name=region)

#     # Get the instance identifier from the ARN
#     instance_identifier = instance_arn.split(":")[6].split("/")[1]

#     # Retrieve the RDS instance details using the resource
#     instance = rds_resource.DBInstance(instance_identifier)

#     # Return the instance details
#     return instance


def get_rds_instance_details(instance_arn):
    # Create an RDS client
    rds_client = session.client("rds")

    # Get the instance identifier from the ARN
    instance_identifier = instance_arn.split(":")[-1]

    # Retrieve the RDS instance details using the client
    response = rds_client.describe_db_instances(DBInstanceIdentifier=instance_identifier)

    # Return the instance details
    return response["DBInstances"][0]


# Example usage
instance_arn = "arn:aws:rds:us-east-1:725371902349:db:my-rds-instance"
# instance_details = get_rds_instance_details(instance_arn)
# print("INSTANCE DETAILS", instance_details)
