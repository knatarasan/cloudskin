import logging

from rest_framework import serializers

from .models.AWSComponent import LB, AWSComponent
from .models.AwsCreds import AwsCreds
from .models.EC2 import EC2
from .models.EC2MetaData import EC2MetaData
from .models.InstallableService import InstallableService
from .models.InstalledService import InstalledService

logger = logging.getLogger(__name__)


class AWSCompSerializer(serializers.ModelSerializer):
    class Meta:
        model = AWSComponent
        fields = ["id", "plan", "region", "security_group", "subnet", "date_created_or_modified"]


class InstallableServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstallableService
        fields = "__all__"


class InstalledServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstalledService
        fields = [
            "id",
            "service",
            "service_version",
            "service_port",
            "service_status",
            "ec2",
            "installable_service",
            "service_url",
            "service_error",
            "install_log",
            "date_created",
            "date_modified",
        ]


class EC2MetaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EC2MetaData
        fields = "__all__"


class EC2Serializer(serializers.ModelSerializer):
    # make sure to add related_name in model as installed_service
    installed_service = InstalledServiceSerializer(many=True, read_only=True)

    class Meta:
        model = EC2
        fields = [
            "id",
            "plan",
            "aws_component",
            "region",
            "security_group",
            "subnet",
            "date_created_or_modified",
            "ec2_instance_id",
            "ec2_status",
            "instance_type",
            "image_id",
            "instance_key_pair",
            "public_ip",
            "private_ip",
            "host_name",
            "installed_service",
        ]


class LBSerializer(serializers.ModelSerializer):
    class Meta:
        model = LB
        fields = [
            "id",
            "plan",
            "aws_component",
            "lb_instance_id",
            "lb_status",
            "lb_type",
            "region",
            "security_group",
            "subnet",
            "date_created_or_modified",
        ]


class AwsCredsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AwsCreds
        fields = [
            "id",
            "aws_iam_user",
            "aws_access_key",
            "aws_access_secret",
            "aws_private_key_pair_pem_name",
            "aws_private_key_pair_pem",
            "aws_access_key_en",
            "aws_access_secret_en",
            "aws_private_key_pair_pem_en",
            "date_created",
            "date_modified",
        ]
        # read_only_fields = ["aws_access_key", "aws_access_secret", "aws_private_key_pair_pem"]
        # With above convertion of read_only_fields could not be pick from front end

        write_only_fields = ["aws_access_key_en", "aws_access_secret_en", "aws_private_key_pair_pem_en"]


# class AwsCredsSerializer(serializers.Serializer):
#     owner = serializers.ReadOnlyField(source='owner.username')
#     aws_access_key = serializers.CharField()
#     aws_access_secret = serializers.CharField()
#
#     def create(self, validated_data):
#         '''
#         create and return a new `AwsCreds` , given the validated data
#         '''
#         aws_creds = AwsCreds.objects.create(**validated_data)
#         logger.info("AwsCreds created")
#         return aws_creds
#
#     def update(self, instance, validated_data):
#         instance.aws_access_key = validated_data.get('aws_access_key', instance.aws_access_key)
#         instance.aws_access_secret = validated_data.get('aws_access_secret', instance.aws_access_secret)
#         instance.save()
#         logger.info("AwsCreds updated")
#         return instance
