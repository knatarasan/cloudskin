import logging

from django.db import connection
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Plan
from .permissions import PlanUserPermission
from .serializers import PlanSerializer
from .services import PlanDeployment

logger = logging.getLogger(__name__)


class PlanList(APIView):
    """
    Plan : Holds all the details of a plan
    """

    permission_classes = [PlanUserPermission]

    def get(self, request, format=None):
        Plans = None

        # for Authorization : su access all objects, specific owner access only his object
        if request.user.is_superuser:
            plans = Plan.objects.all()
        else:
            plans = Plan.objects.filter(owner=request.user)
        serializer = PlanSerializer(plans, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # logger.info(f'\n content_type: {request.content_type}, \n stream: {request.stream}, \n query_params {request.query_params},\n data: {request.data},  \n user: {request.user}, \n auth {request.auth},\n successful_authenticator: {request.successful_authenticator}')
        logger.info(f"400 Check your data obj \n {str(request.data)} has all the elements expected by api end point")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlanDetail(APIView):
    """
    Retrieve, update or delete a plan instance.
    """

    permission_classes = [PlanUserPermission]

    def get_object(self, pk, request):
        logger.info(f"Requested usertype is superuser ? {request.user.is_superuser}")

        # Only user who created the object can access an object
        return get_object_or_404(Plan, pk=pk, owner=request.user)

    def get(self, request, pk, format=None):
        plan = self.get_object(pk, request)
        serializer = PlanSerializer(plan)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        plan = self.get_object(pk, request)
        serializer = PlanSerializer(plan, data=request.data)
        if serializer.is_valid():
            deploy_status = serializer.validated_data["deploy_status"]
            if deploy_status == 2:
                logger.debug(f"TODO PLAN deployment activated")
                planDeployment = PlanDeployment(request, plan)
                planDeployment.get_cloud_objects()

            serializer.save(owner=self.request.user)
            return Response(serializer.data)
        logger.debug(f"inside 401 {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        plan = self.get_object(pk, request)
        with connection.cursor() as cursor:
            # cursor.callproc("public.delete_plan", [pk])

            try:
                cursor.execute(f"CALL public.delete_plan({int(pk)})")
            except Exception as e:
                logger.error(f"Error in delete plan {e}")
                return Response(status=status.HTTP_400_BAD_REQUEST)

        # plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
