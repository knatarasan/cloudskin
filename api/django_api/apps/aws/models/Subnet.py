from django.db import models

# create a model for the Subnet


class Subnet(models.Model):
    subnet_id = models.CharField(max_length=24)
    arn = models.CharField(max_length=66, null=True)
    route_table_id = models.CharField(max_length=21, null=True)
    cidr = models.CharField(max_length=21, null=True)
    state = models.CharField(max_length=21, null=True)
    availability_zone = models.CharField(max_length=21, null=True)
    vpc = models.ForeignKey("VPC", on_delete=models.CASCADE)
