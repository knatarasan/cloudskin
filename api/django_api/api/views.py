from rest_framework import generics, viewsets
from .models import Graph, EC2
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, UserSerializer, MyTokenObtainPairSerializer, GraphSerializer, EC2Serializer
from .permissions import isAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .services import EC2 as EC2Instance


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
        ec2 = EC2Instance()
        instance = ec2.create()
        print('serializer saved', instance)
        serializer.save(owner=self.request.user, ec2_instance_id=instance)

class RegisterViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

#
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
