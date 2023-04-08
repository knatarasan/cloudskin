import boto3
from apps.plan.models import Plan
from django.db import models

from .AwsCreds import RSA, AwsCreds

# create a model for the VPC (Virutal Private Cloud)


class VPC(models.Model):
    vpc_id = models.CharField(max_length=21)
    cidr = models.CharField(max_length=21, null=True)
    region = models.CharField(max_length=21, null=True)
    state = models.CharField(max_length=21, null=True)
    dhcp_options_id = models.CharField(max_length=30, null=True)
    routes_table_id = models.CharField(max_length=21, null=True)  # May need to be extended to separate model
    internet_gateway_id = models.CharField(max_length=21, null=True)
    owner_id = models.CharField(max_length=21)
    plan = models.ForeignKey(Plan, related_name="vpc", on_delete=models.PROTECT)

    def update_vpc_details(self, vpc_boto3):
        self.vpc_id = vpc_boto3.id
        self.cidr = vpc_boto3.cidr_block
        self.state = vpc_boto3.state
        self.dhcp_options_id = vpc_boto3.dhcp_options_id
        rt = vpc_boto3.route_tables.all()
        # self.routes_table_id = rt[0].id
        # self.internet_gateway_id = vpc_boto3.internet_gateway_id
        self.owner_id = vpc_boto3.owner_id

        self.save()
