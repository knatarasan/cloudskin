import boto3

# Connect to EC2
ec2 = boto3.client("ec2")

# Get the instance information
instance_id = "i-0eaa5111ac83e9ba9"
instance = ec2.describe_instances(InstanceIds=[instance_id])["Reservations"][0]["Instances"][0]

# Connect to the EC2 instance using boto3
ssm = boto3.client("ssm")

# Install PostgreSQL on the EC2 instance
response = ssm.send_command(
    InstanceIds=[instance_id],
    DocumentName="AWS-RunShellScript",
    Parameters={
        "commands": [
            "sudo yum install -y postgresql-server"
        ]
    }
)

# Get the command output
command_id = response["Command"]["CommandId"]
output = ssm.get_command_invocation(CommandId=command_id, InstanceId=instance_id)
print(output["StandardOutputContent"])
