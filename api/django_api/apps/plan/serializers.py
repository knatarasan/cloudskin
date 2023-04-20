import logging

from apps.aws.serializers import AWSCompSerializer, VPCSerializer
from rest_framework import serializers

from .models import Plan

logger = logging.getLogger(__name__)


class PlanSerializer(serializers.Serializer):
    """
    Plan is composition of AWSComponents, this is achieved by  StringRelatedField. Ref : https://www.django-rest-framework.org/api-guide/relations/#stringrelatedfield
    """

    plan_id = serializers.ReadOnlyField()
    owner = serializers.ReadOnlyField(source="owner.username")
    plan = serializers.JSONField(required=False)
    deploy_status = serializers.IntegerField()
    running_status = serializers.IntegerField()
    aws_components = AWSCompSerializer(many=True, read_only=True)
    vpc = VPCSerializer(many=True, read_only=True)  # Here many=True doesn't make sense , but removing it throws error

    def create(self, validated_data):
        """
        create and return a new `Plan` , given the validated data
        """
        plan = Plan.objects.create(**validated_data)
        return plan

    def update(self, instance, validated_data):
        # instance.owner = validated_data.get('owner', instance.owner)
        instance.plan = validated_data.get("plan", instance.plan)
        instance.deploy_status = validated_data.get("deploy_status", instance.deploy_status)
        instance.running_status = validated_data.get("running_status", instance.running_status)
        # instance.aws_components = validated_data.get('aws_components', instance.aws_components)
        logger.debug(f"validated_data {instance}")
        instance.save()
        return instance
