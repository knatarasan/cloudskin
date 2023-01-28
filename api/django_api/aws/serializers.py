from rest_framework import serializers
from .models import AWSComponent, EC2, LB, AwsCreds
import logging

logger = logging.getLogger(__name__)

class AWSCompSerializer(serializers.ModelSerializer):
    class Meta:
        model = AWSComponent
        fields = ['id', 'plan', 'region', 'security_group', 'subnet', 'date_created_or_modified']

class EC2Serializer(serializers.ModelSerializer):
    class Meta:
        model = EC2
        fields = ['id', 'plan', 'aws_component','ec2_instance_id', 'ec2_status', 'instance_type', 'image_id', 'region',
                  'security_group', 'subnet', 'date_created_or_modified']

class LBSerializer(serializers.ModelSerializer):
    class Meta:
        model = LB
        fields = ['id', 'plan', 'aws_component','lb_instance_id', 'lb_status', 'lb_type', 'region',
                  'security_group', 'subnet', 'date_created_or_modified']

class AwsCredsSerializer(serializers.Serializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    aws_access_key = serializers.CharField()
    aws_access_secret = serializers.CharField()

    def create(self, validated_data):
        '''
        create and return a new `AwsCreds` , given the validated data
        '''
        aws_creds = AwsCreds.objects.create(**validated_data)
        logger.info("AwsCreds created")
        return aws_creds

    def update(self, instance, validated_data):
        instance.aws_access_key = validated_data.get('aws_access_key', instance.aws_access_key)
        instance.aws_access_secret = validated_data.get('aws_access_secret', instance.aws_access_secret)
        instance.save()
        logger.info("AwsCreds updated")
        return instance