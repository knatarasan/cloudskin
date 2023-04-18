import boto3
from apps.plan.models import Plan
from django.contrib.postgres.fields import ArrayField
from django.db import models

from .AwsCreds import RSA, AwsCreds

# create a model for the VPC (Virutal Private Cloud)


class VPC(models.Model):
    vpc_id = models.CharField(max_length=21)
    cidr = models.CharField(max_length=21, null=True)
    region = models.CharField(max_length=21, null=True)
    state = models.CharField(max_length=21, null=True)
    dhcp_options_id = models.CharField(max_length=30, null=True)
    routes_table_ids = ArrayField(models.CharField(max_length=25), null=True)  # May need to be extended to separate model
    internet_gateway_ids = ArrayField(models.CharField(max_length=21), null=True)  # May need to be extended to separate model
    owner_id = models.CharField(max_length=21)

    # create a foreign key to the plan model, on delete cascade
    plan = models.ForeignKey(
        Plan, related_name="vpc", on_delete=models.CASCADE, null=True
    )  # May need to be extended to separate model

    def update_vpc_details(self, vpc_boto3, subnets):
        self.vpc_id = vpc_boto3.id
        self.cidr = vpc_boto3.cidr_block
        self.state = vpc_boto3.state
        self.dhcp_options_id = vpc_boto3.dhcp_options_id

        # use list comprehension to get the id from each route table
        self.routes_table_ids = [rt.id for rt in list(vpc_boto3.route_tables.all())]

        # use list comprehension to get the id from each internet gateway
        self.internet_gateway_ids = [ig.id for ig in list(vpc_boto3.internet_gateways.all())]
        self.owner_id = vpc_boto3.owner_id

        # create SecurityGroup objects
        for sg in list(vpc_boto3.security_groups.all()):
            try:
                SecurityGroup.objects.get(group_id=sg.id)  # placeholder to check if it exists
            except SecurityGroup.DoesNotExist:
                SecurityGroup.objects.create(
                    group_id=sg.id,
                    group_name=sg.group_name,
                    vpc=self,
                ).save()

        # create Subnet objects
        for sn in list(vpc_boto3.subnets.all()):
            try:
                Subnet.objects.get(subnet_id=sn.id)  # placeholder to check if it exists
            except Subnet.DoesNotExist:
                print("hi")
                Subnet.objects.create(
                    subnet_id=sn.id,
                    arn=sn.subnet_arn,
                    route_table_ids=[rt.id for rt in list(subnets)],
                    cidr=sn.cidr_block,
                    state=sn.state,
                    availability_zone=sn.availability_zone,
                    vpc=self,
                ).save()

        self.save()


class Subnet(models.Model):
    subnet_id = models.CharField(max_length=24)
    arn = models.CharField(max_length=66, null=True)
    route_table_ids = ArrayField(models.CharField(max_length=21), null=True)
    cidr = models.CharField(max_length=21, null=True)
    state = models.CharField(max_length=21, null=True)
    availability_zone = models.CharField(max_length=21, null=True)
    vpc = models.ForeignKey(VPC, related_name="subnet", on_delete=models.CASCADE)


class SecurityGroup(models.Model):
    group_id = models.CharField(max_length=20)
    group_name = models.CharField(max_length=100)
    vpc = models.ForeignKey(VPC, related_name="security_group", on_delete=models.CASCADE)

    def __str__(self):
        return f"group_id: {self.group_id}, group_name:{self.group_name}"
