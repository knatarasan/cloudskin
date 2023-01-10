from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets
from .models import Plan, EC2, AwsCreds
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView

from .permissions import PlanUserPermission  # , IsOwner
from .serializers import UserSerializer, PlanSerializer, \
    EC2Serializer, AwsCredsSerializer, CSTokenObtainPairSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .services import EC2Service as EC2Instance
import logging
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

logger = logging.getLogger(__name__)


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'user': reverse('user-list', request=request, format=format),
        'token': reverse('token-obtain-pair', request=request, format=format),
        'plan': reverse('plan-list', request=request, format=format),
        'ec2': reverse('ec2-list', request=request, format=format),
        'aws_creds': reverse('aws-creds-list', request=request, format=format)
    })


class CSTokenObtainPairView(TokenObtainPairView):
    serializer_class = CSTokenObtainPairSerializer


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

        logger.info(f'400 Check your data obj \n {str(request.data)} has all the elements expected by api end point')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PlanDetail(APIView):
    """
    Retrieve, update or delete a plan instance.
    """
    permission_classes = [PlanUserPermission]

    def get_object(self, pk, request):
        logger.info(f'Requested usertype is superuser ? {request.user.is_superuser}')

        # Only user who created the object can access an object
        return get_object_or_404(Plan, pk=pk,owner=request.user)

    def get(self, request, pk, format=None):
        plan = self.get_object(pk, request)
        serializer = PlanSerializer(plan)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        plan = self.get_object(pk,request)
        serializer = PlanSerializer(plan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        plan = self.get_object(pk,request)
        plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EC2List(APIView):
    """
    List all ec2 instances, or create a new ec2 instance.
    """

    def get(self, request, format=None):
        ec2s = EC2.objects.all()
        serializer = EC2Serializer(ec2s, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        try:
            ec2 = EC2Instance()
            instance = ec2.create()
        except:
            logger.info('Instance not created ')
            return
        logger.info(f'serializer saved {instance}')

        serializer = EC2Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user, ec2_instance_id=instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        logger.info("Response 400 Bad request")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EC2Detail(APIView):
    """
    Retrieve, update or delete a ec2 instance.
    """

    def get_object(self, pk):

        try:
            ec2 = EC2.objects.get(ec2_instance_id=pk)
            return ec2
        except EC2.DoesNotExist:
            ec2 = EC2.objects.get(pk=pk)
            return ec2

        logger.info("Some error with the get")
        raise Http404

    def get(self, request, pk, format=None):
        ec2 = self.get_object(pk)
        serializer = EC2Serializer(ec2)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        ec2 = self.get_object(pk)
        serializer = EC2Serializer(ec2, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        ec2 = self.get_object(pk)
        ec2.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AwsCredsList(APIView):
    def get(self, request, format=None):
        creds = AwsCreds.objects.all()
        serializer = AwsCredsSerializer(creds, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AwsCredsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AwsCredsDetail(APIView):
    """
    Retrieve, update or delete AWS credentials.
    """

    def get(self, request, pk, format=None):
        cred = AwsCreds.objects.get(pk=pk)
        serializer = AwsCredsSerializer(cred)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        cred = AwsCreds.objects.get(pk=pk)
        serializer = AwsCredsSerializer(cred, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cred = AwsCreds.objects.get(pk=pk)
        cred.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserList(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save(owner=self.request.user)
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    def get(self, request, pk, format=None):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = User.objects.get(pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
