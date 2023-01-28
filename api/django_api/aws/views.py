from rest_framework import generics
from .serializers import EC2Serializer, AwsCredsSerializer, LBSerializer
from .models import EC2, AwsCreds, LB
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import EC2Service
import logging

logger = logging.getLogger(__name__)
class LBList(generics.ListCreateAPIView):
    queryset = LB.objects.all()
    serializer_class = LBSerializer

class LBDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LB.objects.all()
    serializer_class = LBSerializer

class EC2List(APIView):
    """
    List all ec2 instances, or create a new ec2 instance.
    """

    def get(self, request, format=None):
        ec2s = EC2.objects.all()
        serializer = EC2Serializer(ec2s, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # try:
        #     ec2 = EC2Instance()
        #     instance = ec2.create()
        # except:
        #     logger.info('Instance not created ')
        #     return
        # logger.info(f'serializer saved {instance}')


        serializer = EC2Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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
            ec2_status = serializer.validated_data['ec2_status']
            if ec2_status == 2:

                logger.debug(f'TODO EC2 this instance would be created ')
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
