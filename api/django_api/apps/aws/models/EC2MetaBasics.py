from django.db import models
from pkg_resources import resource_filename


class EC2MetaBasics(models.Model):
    """
    TODO : Inherit this model from a base MetaData model which has following fields:
    - eff_start_date
    - eff_end_date
    """

    instance_type = models.CharField(max_length=100)
    VCpu = models.IntegerField(null=True)
    Memory_in_mb = models.IntegerField(null=True)
    region_code = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"instance_type: {self.instance_type}, VCpu:{self.VCpu},Memory_in_mb:{self.Memory_in_mb},region_code: {self.region_code}"
