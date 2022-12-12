from rest_framework import generics, viewsets
from .models import Graph, EC2, AwsCreds
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, UserSerializer, MyTokenObtainPairSerializer, GraphSerializer, \
    EC2Serializer, AwsCredsSerializer
from .permissions import isAuthenticated
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
        'users': reverse('user-list', request=request, format=format),
        'graph': reverse('graph-list', request=request, format=format),
        'ec2': reverse('ec2-list', request=request, format=format)
    })


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MyObtainTokenPairViewSet(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# class GraphViewSet(viewsets.ModelViewSet):
#     permission_classes = [isAuthenticated]
#     queryset = Graph.objects.all()
#     serializer_class = GraphSerializer
#
#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
class GraphList(APIView):
    """
    List all snippets, or create a new snippet.
    """

    def get(self, request, format=None):
        graphs = Graph.objects.all()
        serializer = GraphSerializer(graphs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
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


class AwsCredsViewSet(viewsets.ModelViewSet):
    permission_classes = [isAuthenticated]
    queryset = AwsCreds.objects.all()
    serializer_class = AwsCredsSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        logger.info('serializer saved')


class RegisterViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
