import logging

from rest_framework import serializers

from .models.AWSComponent import LB, AWSComponent
from .models.AwsCreds import AwsCreds
from .models.EC2 import EC2
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


# class EC2Serializer(serializers.Serializer):
#     id = serializers.ReadOnlyField()
#     plan = serializers.ReadOnlyField(source='plan.id')
#     aws_component = serializers.ReadOnlyField(source='aws_component.id')
#     region = serializers.ReadOnlyField(source='aws_component.region')
#     security_group = serializers.ReadOnlyField(source='aws_component.security_group')
#     subnet = serializers.ReadOnlyField(source='aws_component.subnet')
#     date_created_or_modified = serializers.ReadOnlyField(source='aws_component.date_created_or_modified')
#     ec2_instance_id = serializers.CharField(max_length=100)
#     ec2_status = serializers.CharField(max_length=100)
#     instance_type = serializers.CharField(max_length=100)
#     image_id = serializers.CharField(max_length=100)
#     instance_key_pair = serializers.CharField(max_length=100)
#     public_ip = serializers.CharField(max_length=100)
#     private_ip = serializers.CharField(max_length=100)
#     host_name = serializers.CharField(max_length=100)
#     installed_services = InstalledServiceSerializer(many=True, read_only=True)
#
#     def create(self, validated_data):
#         '''
#         create and return a new `Plan` , given the validated data
#         '''
#         ec2 = EC2.objects.create(**validated_data)
#         return ec2
#
#     def update(self, instance, validated_data):
#         instance.ec2_instance_id = validated_data.get('ec2_instance_id', instance.ec2_instance_id)
#         instance.ec2_status = validated_data.get('ec2_status', instance.ec2_status)
#         instance.instance_type = validated_data.get('instance_type', instance.instance_type)
#         instance.image_id = validated_data.get('image_id', instance.image_id)
#         instance.instance_key_pair = validated_data.get('instance_key_pair', instance.instance_key_pair)
#         instance.public_ip = validated_data.get('public_ip', instance.public_ip)
#         instance.private_ip = validated_data.get('private_ip', instance.private_ip)
#         instance.host_name = validated_data.get('host_name', instance.host_name)
#         logger.debug(f'validated_data {instance}')
#         instance.save()
#         return instance


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
            "date_created",
            "date_modified",
        ]


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
