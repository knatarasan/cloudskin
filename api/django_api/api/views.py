from rest_framework import generics, viewsets
from .models import Graph, EC2, AwsCreds
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, GraphSerializer, \
    EC2Serializer, AwsCredsSerializer, MyTokenObtainPairSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .services import EC2Service as EC2Instance
import logging
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404

logger = logging.getLogger('django')


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'user': reverse('user-list', request=request, format=format),
        'token': reverse('token-obtain-pair', request=request, format=format),
        'graph': reverse('graph-list', request=request, format=format),
        'ec2': reverse('ec2-list', request=request, format=format),
        'aws_creds': reverse('aws-creds-list', request=request, format=format)
    })

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class GraphList(APIView):
    """
    List all snippets, or create a new snippet.
    """

    def get(self, request, format=None):
        graphs = Graph.objects.all()
        serializer = GraphSerializer(graphs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        logger.info('Yes baby you are here boba')
        serializer = GraphSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GraphDetail(APIView):
    """
    Retrieve, update or delete a graph instance.
    """

    def get_object(self, pk):
        try:
            return Graph.objects.get(pk=pk)
        except Graph.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        graph = self.get_object(pk)
        serializer = GraphSerializer(graph)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        graph = self.get_object(pk)
        serializer = GraphSerializer(graph, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        graph = self.get_object(pk)
        graph.delete()
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
        ec2 = None
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
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
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