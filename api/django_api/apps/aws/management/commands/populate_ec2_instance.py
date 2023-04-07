import json
import logging

import boto3
from apps.aws.models.EC2MetaBasics import EC2MetaBasics
from django.core.management.base import BaseCommand, CommandError
from pkg_resources import resource_filename

logger = logging.getLogger(__name__)

"""
To execute this `python manage.py populate_ec2_metadata`
"""


class Command(BaseCommand):
    help = "Populates the EC2MetaData table with the latest data from AWS"

    def handle(self, *args, **options):
        # Get the latest data from AWS

        region_name = "us-east-1"
        # Replace <region-name> with the name of the AWS region you want to view the instance types for

        ec2_client = boto3.client("ec2", region_name=region_name)

        paginator = ec2_client.get_paginator("describe_instance_types")
        page_iterator = paginator.paginate()

        for page in page_iterator:
            for instance_type in page["InstanceTypes"]:  # refer a sample output at the end of this file
                instance, created = EC2MetaBasics.objects.update_or_create(
                    instance_type=instance_type["InstanceType"],
                    defaults={
                        "VCpu": instance_type.get("VCpuInfo").get("DefaultVCpus"),
                        "Memory_in_mb": instance_type.get("MemoryInfo").get("SizeInMiB"),
                        "region_code": region_name,
                    },
                )

        # page["InstanceTypes"] = [
        #         {
        #             "InstanceType": "m5.8xlarge",
        #             "CurrentGeneration": True,
        #             "FreeTierEligible": False,
        #             "SupportedUsageClasses": ["on-demand", "spot"],
        #             "SupportedRootDeviceTypes": ["ebs"],
        #             "SupportedVirtualizationTypes": ["hvm"],
        #             "BareMetal": False,
        #             "Hypervisor": "nitro",
        #             "ProcessorInfo": {"SupportedArchitectures": ["x86_64"], "SustainedClockSpeedInGhz": 3.1},
        #             "VCpuInfo": {
        #                 "DefaultVCpus": 32,
        #                 "DefaultCores": 16,
        #                 "DefaultThreadsPerCore": 2,
        #                 "ValidCores": [2, 4, 6, 8, 10, 12, 14, 16],
        #                 "ValidThreadsPerCore": [1, 2],
        #             },
        #             "MemoryInfo": {"SizeInMiB": 131072},
        #             "InstanceStorageSupported": False,
        #             "EbsInfo": {
        #                 "EbsOptimizedSupport": "default",
        #                 "EncryptionSupport": "supported",
        #                 "EbsOptimizedInfo": {
        #                     "BaselineBandwidthInMbps": 6800,
        #                     "BaselineThroughputInMBps": 850.0,
        #                     "BaselineIops": 30000,
        #                     "MaximumBandwidthInMbps": 6800,
        #                     "MaximumThroughputInMBps": 850.0,
        #                     "MaximumIops": 30000,
        #                 },
        #                 "NvmeSupport": "required",
        #             },
        #             "NetworkInfo": {
        #                 "NetworkPerformance": "10 Gigabit",
        #                 "MaximumNetworkInterfaces": 8,
        #                 "MaximumNetworkCards": 1,
        #                 "DefaultNetworkCardIndex": 0,
        #                 "NetworkCards": [
        #                     {"NetworkCardIndex": 0, "NetworkPerformance": "10 Gigabit", "MaximumNetworkInterfaces": 8}
        #                 ],
        #                 "Ipv4AddressesPerInterface": 30,
        #                 "Ipv6AddressesPerInterface": 30,
        #                 "Ipv6Supported": True,
        #                 "EnaSupport": "required",
        #                 "EfaSupported": False,
        #                 "EncryptionInTransitSupported": False,
        #                 "EnaSrdSupported": False,
        #             },
        #             "PlacementGroupInfo": {"SupportedStrategies": ["cluster", "partition", "spread"]},
        #             "HibernationSupported": True,
        #             "BurstablePerformanceSupported": False,
        #             "DedicatedHostsSupported": True,
        #             "AutoRecoverySupported": True,
        #             "SupportedBootModes": ["legacy-bios", "uefi"],
        #         }
        #     ]
