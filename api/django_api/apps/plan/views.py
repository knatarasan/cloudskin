import logging

from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Plan
from .permissions import PlanUserPermission
from .serializers import PlanListSerializer, PlanSerializer
from .services import PlanDeployment

logger = logging.getLogger(__name__)


class PlanViewSet(viewsets.ModelViewSet):
    """
    View to manage user plan
    """

    serializer_class = PlanSerializer
    http_method_names = ["get", "post", "put", "delete"]
    # lookup_field = "plan_no"
    permission_classes = [PlanUserPermission]

    def get_queryset(self):
        """
        This view returns list of plans for the currently authenticated user.
        """
        return Plan.objects.all().filter(owner=self.request.user)

    def get_serializer_class(self):
        if self.action in ["list"]:
            return PlanListSerializer
        return super().get_serializer_class()

    # TODO - Create a separate path for deploy and remove below code
    def update(self, request, *args, **kwargs):
        super().update(request, *args, **kwargs)
        plan = self.get_object()
        serializer = PlanSerializer(context={"request": request}, instance=plan, data=request.data)
        if serializer.is_valid():
            deploy_status = serializer.validated_data["deploy_status"]
            if deploy_status == 2:
                logger.debug(f"TODO PLAN deployment activated")
                planDeployment = PlanDeployment(request, plan)
                planDeployment.get_cloud_objects()

            serializer.save()
            return Response(serializer.data)
        logger.debug(f"inside 401 {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
