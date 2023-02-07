import json
import logging

import boto3
from apps.aws.models.EC2MetaData import EC2MetaData
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
        client = boto3.client("pricing", region_name="us-east-1")
        data = client.get_products(ServiceCode="AmazonEC2")

        logger.debug("ec2_metadata is refreshed from aws")

        for p in data["PriceList"]:
            instance_detail: dict = self.get_instance_details(p)
            logger.debug(f"instance_detail : {instance_detail}")
            if len(instance_detail) == 0:
                logger.debug(f"This is skipped since instance_detail : {instance_detail}")
                continue

            ec2metadata = None
            try:
                # TODO convert this to update_or_create
                ec2metadata = EC2MetaData.objects.create(
                    instance_type=instance_detail["instance_type"],
                    region_code=instance_detail["region_code"],
                    price=instance_detail["price"],
                    price_currency=instance_detail["price_currency"],
                )
                ec2metadata.save()
                logger.debug(f"ec2metadata : {ec2metadata}")

            except Exception as e:
                logger.debug(f"Table not loaded {ec2metadata}  error {e}")

    def get_instance_details(self, p):
        result = {}
        try:
            product = json.loads(p)

            if product["product"]["productFamily"] == "Compute Instance":
                sku_key = list(product["terms"]["OnDemand"].keys())[0]
                instance_type = product["product"]["attributes"]["instanceType"]
                regionCode = product["product"]["attributes"]["regionCode"]
                sku_third_key = list(product["terms"]["OnDemand"][sku_key]["priceDimensions"].keys())[0]
                price_currency = list(
                    product["terms"]["OnDemand"][sku_key]["priceDimensions"][sku_third_key]["pricePerUnit"].keys()
                )[0]
                price = product["terms"]["OnDemand"][sku_key]["priceDimensions"][sku_third_key]["pricePerUnit"][price_currency]
                result = {
                    "instance_type": instance_type,
                    "region_code": regionCode,
                    "price": price,
                    "price_currency": price_currency,
                }
        except Exception as e:
            logger.debug(f"p is not a valid json {p} error {e}")
        return result
