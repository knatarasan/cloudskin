from rest_framework import serializers
from .models.AWSComponent import AWSComponent, LB
from .models.AwsCreds import AwsCreds
from .models.InstalledService import InstalledService

from .models.EC2 import EC2
import logging

logger = logging.getLogger(__name__)


class AWSCompSerializer(serializers.ModelSerializer):
    class Meta:
        model = AWSComponent
        fields = ['id', 'plan', 'region', 'security_group', 'subnet', 'date_created_or_modified']

class InstalledServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstalledService
        fields = '__all__'


class EC2Serializer(serializers.ModelSerializer):
    class Meta:
        model = EC2
        fields = '__all__'


class LBSerializer(serializers.ModelSerializer):
    class Meta:
        model = LB
        fields = ['id', 'plan', 'aws_component', 'lb_instance_id', 'lb_status', 'lb_type', 'region',
                  'security_group', 'subnet', 'date_created_or_modified']


class AwsCredsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AwsCreds
        fields = ['id', 'aws_iam_user', 'aws_access_key', 'aws_access_secret', 'aws_private_key_pair_pem_name',
                  'aws_private_key_pair_pem', 'date_created', 'date_modified']

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
