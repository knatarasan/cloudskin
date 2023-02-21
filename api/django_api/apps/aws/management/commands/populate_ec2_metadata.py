import json
import logging

import boto3
from apps.aws.models.EC2MetaData import EC2MetaData
from django.core.management.base import BaseCommand, CommandError
from pkg_resources import resource_filename

logger = logging.getLogger(__name__)

"""
To execute this `python manage.py populate_ec2_metadata`

Ref : https://pet2cattle.com/2022/05/python-ondemand-instance-price
Ref : https://stackoverflow.com/questions/51673667/use-boto3-to-get-current-price-for-given-ec2-instance-type

"""


class Command(BaseCommand):
    help = "Populates the EC2MetaData table with the latest data from AWS"

    def get_region_name(self, region_code):
        default_region = "US East (N. Virginia)"
        endpoint_file = resource_filename("botocore", "data/endpoints.json")
        try:
            with open(endpoint_file, "r") as f:
                data = json.load(f)
            # Botocore is using Europe while Pricing API using EU...sigh...
            return data["partitions"][0]["regions"][region_code]["description"].replace("Europe", "EU")
        except IOError:
            return default_region

    def handle(self, *args, **options):
        # Get the latest data from AWS

        client = boto3.client("pricing", region_name="us-east-1")

        FLT = (
            '[{{"Field": "termType", "Value": "OnDemand", "Type": "TERM_MATCH"}},'
            '{{"Field": "location", "Value": "{r}", "Type": "TERM_MATCH"}}]'
        )

        # FLT = (
        #     '[{{"Field": "instanceType", "Value": "{t}", "Type": "TERM_MATCH"}},'
        #     '{{"Field": "termType", "Value": "OnDemand", "Type": "TERM_MATCH"}},'
        #     '{{"Field": "location", "Value": "{r}", "Type": "TERM_MATCH"}}]'
        # )
        region = self.get_region_name("us-west-1")
        # instance = "t2.micro"

        f = FLT.format(r=region)
        # f = FLT.format(r=region, t=instance)
        paginator = client.get_paginator("get_products")
        page_iterator = paginator.paginate(ServiceCode="AmazonEC2", Filters=json.loads(f))

        for page in page_iterator:
            for p in page["PriceList"]:
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
                        details=json.loads(p),
                    )
                    ec2metadata.save()
                    logger.debug(f"ec2metadata : {ec2metadata}")

                except Exception as e:
                    logger.debug(f"Table not loaded {ec2metadata}  error {e}")
        # # Paginated

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
