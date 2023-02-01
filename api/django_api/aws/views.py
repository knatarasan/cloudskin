from rest_framework import generics, viewsets
from .serializers import EC2Serializer, AwsCredsSerializer, LBSerializer
from .models.EC2 import EC2
from .models.AWSComponent import LB
from .models.AwsCreds import AwsCreds
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
import logging

logger = logging.getLogger(__name__)


class LBList(generics.ListCreateAPIView):
    queryset = LB.objects.all()
    serializer_class = LBSerializer


class LBDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LB.objects.all()
    serializer_class = LBSerializer


class EC2ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ec2 instances to be viewed or edited.
    """
    queryset = EC2.objects.all()
    serializer_class = EC2Serializer

    @action(detail=True, methods=['post'])  # Refer https://www.django-rest-framework.org/api-guide/routers/#routing-for-extra-actions
    def create_instance(self, request, pk=None):
        logger.debug(' at start of create_instance  ')
        ec2 = EC2.objects.get(pk=pk)
        logger.debug(f'ec2 is {ec2}')
        ec2.create_aws_instance()
        return Response(status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def update_instance_details(self, request, pk=None):
        ec2 = EC2.objects.get(pk=pk)
        ec2.update_instance_details()
        serializer = EC2Serializer(ec2)
        return Response(serializer.data,status=status.HTTP_200_OK)


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
