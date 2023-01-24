from rest_framework import serializers
from .models import Plan
import logging

from aws.serializers import AWSCompSerializer

logger = logging.getLogger(__name__)


class PlanSerializer(serializers.Serializer):
    """
    Plan is composition of AWSComponents, this is achieved by  StringRelatedField. Ref : https://www.django-rest-framework.org/api-guide/relations/#stringrelatedfield
    """
    id = serializers.ReadOnlyField()
    owner = serializers.ReadOnlyField(source='owner.username')
    plan = serializers.JSONField()
    deploy_status = serializers.IntegerField()
    running_status = serializers.IntegerField()
    aws_components = AWSCompSerializer(many=True, read_only=True)

    def create(self, validated_data):
        '''
        create and return a new `Plan` , given the validated data
        '''
        plan = Plan.objects.create(**validated_data)
        return plan

    def update(self, instance, validated_data):
        instance.plan = validated_data.get('plan', instance.plan)
        instance.save()
        return instance
