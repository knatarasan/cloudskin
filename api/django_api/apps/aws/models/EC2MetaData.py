from django.db import models
from pkg_resources import resource_filename


class EC2MetaData(models.Model):
    """
    TODO : Inherit this model from a base MetaData model which has following fields:
    - eff_start_date
    - eff_end_date
    """

    instance_type = models.CharField(max_length=100)
    current_generation = models.BooleanField(null=True)
    free_tier_eligible = models.BooleanField(null=True)
    supported_usage_classes = models.JSONField(null=True)
    supported_root_device_types = models.JSONField(null=True)
    supported_virtualization_types = models.JSONField(null=True)
    bare_metal = models.BooleanField(null=True)
    hypervisor = models.CharField(max_length=100, null=True)
    processor_info = models.JSONField(null=True)
    vcpu_info = models.JSONField(null=True)
    memory_info = models.JSONField(null=True)
    network_info = models.JSONField(null=True)
    placement_group_info = models.JSONField(null=True)
    hibernation_supported = models.BooleanField(null=True)
    burstable_performance_supported = models.BooleanField(null=True)
    dedicated_hosts_supported = models.BooleanField(null=True)
    auto_recovery_supported = models.BooleanField(null=True)
    supported_boot_modes = models.JSONField(null=True)
    region_code = models.CharField(max_length=100, null=True)
    price_currency = models.CharField(max_length=3, null=True)
    price = models.FloatField(null=True)
    details = models.JSONField(null=True)

    class Meta:
        """
        TODO : Meta for this model should have list of columns where history tracked
        eg: price
        """

        db_table = "ec2_metadata"

    def __str__(self):
        return f"instance_type: {self.instance_type}, region_code: {self.region_code}, price: {self.price}, price_currency: {self.price_currency}"
