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
    "VpcSecurityGroupIds": ["sg-09e15ea1f1fc88809"],
    "AvailabilityZone": "us-east-1b",
    "DBName": "rdsdatabase",
    # Add more parameters as needed
}

response = rds_client.create_db_instance(**rds_params)

print("response", response)
