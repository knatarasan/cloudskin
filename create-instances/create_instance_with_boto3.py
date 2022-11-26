import boto3
ec2 = boto3.resource('ec2')

instances = ec2.create_instances(
        ImageId="ami-068a09dfe4f11cc6a",
        MinCount=1,
        MaxCount=1,
        InstanceType="t2.micro",
        KeyName="InstanceKeyPair"
    )

# Used this resource: https://blog.knoldus.com/how-to-create-ec2-instance-using-python3-with-boto3/