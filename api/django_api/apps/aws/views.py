import logging

from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models.aws_network import VPC, SecurityGroup, Subnet
from .models.AWSComponent import LB
from .models.AwsCreds import AwsCreds
from .models.EC2 import EC2
from .models.EC2MetaBasics import EC2MetaBasics
from .models.EC2MetaData import EC2MetaData
from .models.InstallableService import InstallableService
from .models.InstalledService import InstalledService
from .models.RDS import RDS
from .serializers import (
    AwsCredsSerializer,
    EC2MetaBasicsSerializer,
    EC2MetaDataSerializer,
    EC2Serializer,
    InstallableServiceSerializer,
    InstalledServiceSerializer,
    LBSerializer,
    RDSSerializer,
    SecurityGroupSerializer,
    SubnetSerializer,
    VPCSerializer,
)

logger = logging.getLogger(__name__)


class LBList(generics.ListCreateAPIView):
    queryset = LB.objects.all()
    serializer_class = LBSerializer


class LBDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LB.objects.all()
    serializer_class = LBSerializer


class InstallableServiceViewSet(viewsets.ModelViewSet):
    queryset = InstallableService.objects.all()
    serializer_class = InstallableServiceSerializer


class EC2MetaDataViewSet(viewsets.ModelViewSet):
    queryset = EC2MetaData.objects.all()
    serializer_class = EC2MetaDataSerializer


class InstalledServiceViewSet(viewsets.ModelViewSet):
    queryset = InstalledService.objects.all()
    serializer_class = InstalledServiceSerializer

    @action(detail=True, methods=["post"])
    def install_service(self, request, pk=None):
        installed_service = InstalledService.objects.get(pk=pk)
        installed_service.install_service()
        serializer = InstalledServiceSerializer(installed_service)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def uninstall_service(self, request, pk=None):
        installed_service = InstalledService.objects.get(pk=pk)
        installed_service.uninstall_service()
        serializer = InstalledServiceSerializer(installed_service)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RDSViewSet(viewsets.ModelViewSet):
    queryset = RDS.objects.all()
    serializer_class = RDSSerializer


class EC2ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ec2 instances to be viewed or edited.
    """

    queryset = EC2.objects.all()
    serializer_class = EC2Serializer

    @action(detail=True, methods=["get"])
    def health(self, request, pk=None):
        ec2 = EC2.objects.get(pk=pk)
        serializer = EC2Serializer(ec2)

        if ec2.health():
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    # Refer https://www.django-rest-framework.org/api-guide/routers/#routing-for-extra-actions
    @action(detail=True, methods=["put"])
    def create_instance(self, request, pk=None):
        logger.debug(" at start of create_instance  ")
        ec2 = EC2.objects.get(pk=pk)
        logger.debug(f"ec2 is {ec2}")
        if ec2.create_aws_instance():
            serializer = EC2Serializer(ec2)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            logger.debug("Instance creation failed")
            serializer = EC2Serializer(ec2)
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["put"])
    def terminate_instance(self, request, pk=None):
        ec2 = EC2.objects.get(pk=pk)
        ec2.terminate_aws_instance()
        serializer = EC2Serializer(ec2)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    @action(detail=True, methods=["get"])
    def update_instance_details(self, request, pk=None):
        ec2 = EC2.objects.get(pk=pk)
        if ec2.ec2_instance_id:
            if ec2.update_instance_details():
                serializer = EC2Serializer(ec2)

                # 201 since , if there is any update in instance , ec2 object will be updated
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                serializer = EC2Serializer(ec2)
                return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        else:
            logger.debug("No instance for this ec2 object ")
            serializer = EC2Serializer(ec2)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    @action(detail=True, methods=["put"])
    def install_service(self, request, pk=None):
        logger.debug(f" at start of install_service  request {request}")
        ec2 = EC2.objects.get(pk=pk)
        ec2.install_service("postgresql")
        serializer = EC2Serializer(ec2)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["put"])
    def uninstall_service(self, request, pk=None):
        logger.debug(
            f" at start of uninstall_service  request{request}",
        )
        ec2 = EC2.objects.get(pk=pk)
        ec2.uninstall_service("postgresql")
        serializer = EC2Serializer(ec2)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EC2MetaBasicViewSet(viewsets.ModelViewSet):
    queryset = EC2MetaBasics.objects.all().order_by("instance_type")
    serializer_class = EC2MetaBasicsSerializer


class VPCViewSet(viewsets.ModelViewSet):
    queryset = VPC.objects.all()
    serializer_class = VPCSerializer


class SubnetViewSet(viewsets.ModelViewSet):
    queryset = Subnet.objects.all()
    serializer_class = SubnetSerializer


class SecurityGroupViewSet(viewsets.ModelViewSet):
    queryset = SecurityGroup.objects.all()
    serializer_class = SecurityGroupSerializer


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
