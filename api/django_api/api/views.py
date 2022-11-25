from rest_framework import generics
from .models import Graph
from .serializers import GraphSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer
from .permissions import isAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .serializers import UserSerializer

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'graph': reverse('graph-list', request=request, format=format)
    })

class UserList(generics.ListAPIView):
    queryset=User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset=User.objects.all()
    serializer_class = UserSerializer

class MyObtainTokenPairViewSet(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GraphViewSet(viewsets.ModelViewSet):
    permission_classes = [isAuthenticated]
    queryset = Graph.objects.all()
    serializer_class = GraphSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RegisterViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


#
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
