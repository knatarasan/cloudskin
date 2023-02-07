import json

import boto3
from pkg_resources import resource_filename

# Use AWS Pricing API through Boto3
# API only has us-east-1 and ap-south-1 as valid endpoints.
# It doesn't have any impact on your selected region for your instance.
client = boto3.client("pricing", region_name="us-east-1")

# Search product filter. This will reduce the amount of data returned by the
# get_products function of the Pricing API
FLT = (
    '[{{"Field": "tenancy", "Value": "shared", "Type": "TERM_MATCH"}},'
    '{{"Field": "operatingSystem", "Value": "{o}", "Type": "TERM_MATCH"}},'
    '{{"Field": "preInstalledSw", "Value": "NA", "Type": "TERM_MATCH"}},'
    '{{"Field": "instanceType", "Value": "{t}", "Type": "TERM_MATCH"}},'
    '{{"Field": "location", "Value": "{r}", "Type": "TERM_MATCH"}},'
    '{{"Field": "capacitystatus", "Value": "Used", "Type": "TERM_MATCH"}}]'
)


def get_instance_details(p):
    product = json.loads(p)
    if product["product"]["productFamily"] == "Compute Instance":
        sku_key = list(product["terms"]["OnDemand"].keys())[0]
        instance_type = product["product"]["attributes"]["instanceType"]
        regionCode = product["product"]["attributes"]["regionCode"]
        sku_third_key = list(product["terms"]["OnDemand"][sku_key]["priceDimensions"].keys())[0]
        price_USD = product["terms"]["OnDemand"][sku_key]["priceDimensions"][sku_third_key]["pricePerUnit"]["USD"]
        return {"instance_type": instance_type, "region_code": regionCode, "price_USD": price_USD}


# Get current AWS price for an on-demand instance
def get_price(region, instance, os):
    f = FLT.format(r=region, t=instance, o=os)
    data = client.get_products(ServiceCode="AmazonEC2")

    for p in data["PriceList"]:
        get_instance_details(p)


# Translate region code to region name. Even though the API data contains
# regionCode field, it will not return accurate data. However using the location
# field will, but then we need to translate the region code into a region name.
# You could skip this by using the region names in your code directly, but most
# other APIs are using the region code.
def get_region_name(region_code):
    default_region = "US East (N. Virginia)"
    endpoint_file = resource_filename("botocore", "data/endpoints.json")
    try:
        with open(endpoint_file, "r") as f:
            data = json.load(f)
        # Botocore is using Europe while Pricing API using EU...sigh...
        print(data["partitions"][0]["regions"][region_code]["description"].replace("Europe", "EU"))
        return data["partitions"][0]["regions"][region_code]["description"].replace("Europe", "EU")
    except IOError:
        return default_region


# Get current price for a given instance, region and os
price = get_price(get_region_name("us-west-1"), "t2.micro", "Linux")

'''

'''
product = {
    "product": {
        "productFamily": "Compute Instance",
        "attributes": {
            "enhancedNetworkingSupported": "Yes",
            "intelTurboAvailable": "Yes",
            "memory": "4 GiB",
            "dedicatedEbsThroughput": "Up to 10000 Mbps",
            "vcpu": "2",
            "classicnetworkingsupport": "false",
            "capacitystatus": "Used",
            "locationType": "AWS Region",
            "storage": "EBS only",
            "instanceFamily": "Compute optimized",
            "operatingSystem": "Windows",
            "abdInstanceClass": "c",
            "intelAvx2Available": "Yes",
            "regionCode": "ap-northeast-1",
            "physicalProcessor": "Intel Xeon 8375C (Ice Lake)",
            "clockSpeed": "3.5 GHz",
            "ecu": "NA",
            "networkPerformance": "Up to 12500 Megabit",
            "servicename": "Amazon Elastic Compute Cloud",
            "gpuMemory": "NA",
            "vpcnetworkingsupport": "true",
            "instanceType": "c6i.large",
            "tenancy": "Dedicated",
            "usagetype": "APN1-DedicatedUsage:c6i.large",
            "normalizationSizeFactor": "4",
            "intelAvxAvailable": "Yes",
            "processorFeatures": "Intel AVX; Intel AVX2; Intel AVX512; Intel Turbo",
            "servicecode": "AmazonEC2",
            "licenseModel": "No License required",
            "currentGeneration": "Yes",
            "preInstalledSw": "SQL Web",
            "location": "Asia Pacific (Tokyo)",
            "processorArchitecture": "64-bit",
            "marketoption": "OnDemand",
            "operation": "RunInstances:0202",
            "availabilityzone": "NA",
        },
        "sku": "2223B6PCG6QAUYY6",
    },
    "serviceCode": "AmazonEC2",
    "terms": {
        "OnDemand": {
            "2223B6PCG6QAUYY6.JRTCKXETXF": {
                "priceDimensions": {
                    "2223B6PCG6QAUYY6.JRTCKXETXF.6YS6EN2CT7": {
                        "unit": "Hrs",
                        "endRange": "Inf",
                        "description": "$0.2773 per Dedicated Windows with SQL Web c6i.large Instance Hour",
                        "appliesTo": [],
                        "rateCode": "2223B6PCG6QAUYY6.JRTCKXETXF.6YS6EN2CT7",
                        "beginRange": "0",
                        "pricePerUnit": {"USD": "0.2773000000"},
                    }
                },
                "sku": "2223B6PCG6QAUYY6",
                "effectiveDate": "2023-02-01T00:00:00Z",
                "offerTermCode": "JRTCKXETXF",
                "termAttributes": {},
            }
        },
        "Reserved": {
            "2223B6PCG6QAUYY6.7NE97W5U4E": {
                "priceDimensions": {
                    "2223B6PCG6QAUYY6.7NE97W5U4E.6YS6EN2CT7": {
                        "unit": "Hrs",
                        "endRange": "Inf",
                        "description": "Windows with SQL Server Web (Amazon VPC), c6i.large reserved instance applied",
                        "appliesTo": [],
                        "rateCode": "2223B6PCG6QAUYY6.7NE97W5U4E.6YS6EN2CT7",
                        "beginRange": "0",
                        "pricePerUnit": {"USD": "0.2489500000"},
                    }
                },
    :
    :
    :
'''
# print(get_instance_details(product))
