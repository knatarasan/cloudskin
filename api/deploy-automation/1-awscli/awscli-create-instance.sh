# Following command will spin an EC2 instance
aws ec2 run-instances --image-id ami-0f5e8a042c8bfcd5e --count 1 --instance-type t2.micro --key-name InstanceKeyPair --security-group-ids sg-0f0a091c6dbec3b84 --subnet-id subnet-07c629ac5ff9025bb

# Executing this will get the following response
{
    "Groups": [],
    "Instances": [
        {
            "AmiLaunchIndex": 0,
            "ImageId": "ami-0f5e8a042c8bfcd5e",
            "InstanceId": "i-051c47f0c927e295c",
            "InstanceType": "t2.micro",
            "KeyName": "InstanceKeyPair",
            "LaunchTime": "2022-11-27T01:19:18+00:00",
            "Monitoring": {
                "State": "disabled"
            },
            "Placement": {
                "AvailabilityZone": "us-west-1a",
                "GroupName": "",
                "Tenancy": "default"
            },
            "PrivateDnsName": "ip-10-0-1-242.us-west-1.compute.internal",
            "PrivateIpAddress": "10.0.1.242",
            "ProductCodes": [],
            "PublicDnsName": "",
            "State": {
                "Code": 0,
                "Name": "pending"
            },
            "StateTransitionReason": "",
            "SubnetId": "subnet-07c629ac5ff9025bb",
            "VpcId": "vpc-07889fea33f6271ee",
            "Architecture": "x86_64",
            "BlockDeviceMappings": [],
            "ClientToken": "915d4ca3-36d6-4d5e-823b-fb36d234bee2",
            "EbsOptimized": false,
            "EnaSupport": true,
            "Hypervisor": "xen",
            "NetworkInterfaces": [
                {
                    "Attachment": {
                        "AttachTime": "2022-11-27T01:19:18+00:00",
                        "AttachmentId": "eni-attach-08ca8e58522b96a64",
                        "DeleteOnTermination": true,
                        "DeviceIndex": 0,
                        "Status": "attaching",
                        "NetworkCardIndex": 0
                    },
                    "Description": "",
                    "Groups": [
                        {
                            "GroupName": "InstanceSecurityGroup",
                            "GroupId": "sg-0f0a091c6dbec3b84"
                        }
                    ],
                    "Ipv6Addresses": [],
                    "MacAddress": "02:f9:03:2b:2c:75",
                    "NetworkInterfaceId": "eni-02e906f65694e52ca",
                    "OwnerId": "334431854769",
                    "PrivateIpAddress": "10.0.1.242",
                    "PrivateIpAddresses": [
                        {
                            "Primary": true,
                            "PrivateIpAddress": "10.0.1.242"
                        }
                    ],
                    "SourceDestCheck": true,
                    "Status": "in-use",
                    "SubnetId": "subnet-07c629ac5ff9025bb",
                    "VpcId": "vpc-07889fea33f6271ee",
                    "InterfaceType": "interface"
                }
            ],
            "RootDeviceName": "/dev/xvda",
            "RootDeviceType": "ebs",
            "SecurityGroups": [
                {
                    "GroupName": "InstanceSecurityGroup",
                    "GroupId": "sg-0f0a091c6dbec3b84"
                }
            ],
            "SourceDestCheck": true,
            "StateReason": {
                "Code": "pending",
                "Message": "pending"
            },
            "VirtualizationType": "hvm",
            "CpuOptions": {
                "CoreCount": 1,
                "ThreadsPerCore": 1
            },
            "CapacityReservationSpecification": {
                "CapacityReservationPreference": "open"
            },
            "MetadataOptions": {
                "State": "pending",
                "HttpTokens": "optional",
                "HttpPutResponseHopLimit": 1,
                "HttpEndpoint": "enabled",
                "HttpProtocolIpv6": "disabled",
                "InstanceMetadataTags": "disabled"
            },
            "EnclaveOptions": {
                "Enabled": false
            },
            "PrivateDnsNameOptions": {
                "HostnameType": "ip-name",
                "EnableResourceNameDnsARecord": false,
                "EnableResourceNameDnsAAAARecord": false
            },
            "MaintenanceOptions": {
                "AutoRecovery": "default"
            }
        }
    ],
    "OwnerId": "334431854769",
    "ReservationId": "r-09e253e2507f3a032"
}

# To get list of EC2 instances, run this command:
aws ec2 describe-instances

# To get list of EC2 instances id by running state:
aws ec2 describe-instances --region us-west-1 --query 'Reservations[].Instances[].[InstanceId,Tags[]]' --output text --filters Name=instance-state-name,Values=running

# Got AMI ID from this resource: https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#AMICatalog