from django.db import models

# create a model for the Subnet


class Subnet(models.Model):
    subnet_id = models.CharField(max_length=24)
    arn = models.CharField(max_length=66)
    route_table_id = models.CharField(max_length=21)
    cidr = models.CharField(max_length=21)
    region = models.CharField(max_length=21)
    state = models.CharField(max_length=21)
    availability_zone = models.CharField(max_length=21)
    vpc = models.ForeignKey("VPC", on_delete=models.CASCADE)
