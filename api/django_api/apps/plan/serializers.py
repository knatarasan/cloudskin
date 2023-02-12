import logging

from rest_framework import serializers

from apps.aws.serializers import AWSCompSerializer

from .models import Plan

logger = logging.getLogger(__name__)


class PlanSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())
    plan = serializers.JSONField(source="data")
    aws_components = AWSCompSerializer(many=True, read_only=True)

    class Meta:
        model = Plan
        fields = ["plan_id", "plan_no", "owner", "plan", "deploy_status", "running_status", "aws_components"]


class PlanListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = [
            "plan_id",
            "plan_no",
            "owner",
            "deploy_status",
            "running_status",
        ]
