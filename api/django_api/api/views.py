from rest_framework import generics, viewsets
from .models import Graph, EC2, AwsCreds
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, UserSerializer, MyTokenObtainPairSerializer, GraphSerializer, EC2Serializer , AwsCredsSerializer
from .permissions import isAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .services import EC2 as EC2Instance
import logging
from django.conf import settings

logger = logging.getLogger('django')


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'graph': reverse('graph-list', request=request, format=format)
    })


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MyObtainTokenPairViewSet(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GraphViewSet(viewsets.ModelViewSet):
    permission_classes = [isAuthenticated]
    queryset = Graph.objects.all()
    serializer_class = GraphSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EC2ViewSet(viewsets.ModelViewSet):
    permission_classes = [isAuthenticated]
    queryset = EC2.objects.all()
    serializer_class = EC2Serializer

    def perform_create(self, serializer):
        logger.info("in EC2ViewSet")
        try:
            ec2 = EC2Instance()
            instance = ec2.create()
        except:
            logger.info('Instance not created ')
            return
        logger.info(f'serializer saved {instance}')
        serializer.save(owner=self.request.user, ec2_instance_id=instance)

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

