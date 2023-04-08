from django.db import models

# create a model for the VPC (Virutal Private Cloud)


class VPC(models.Model):
    vpc_id = models.CharField(max_length=21)
    cidr = models.CharField(max_length=21)
    region = models.CharField(max_length=21)
    state = models.CharField(max_length=21)
    dhcp_options_id = models.CharField(max_length=30)
    routes_table_id = models.CharField(max_length=21)  # May need to be extended to separate model
    internet_gateway_id = models.CharField(max_length=21)
    owner_id = models.CharField(max_length=21)
