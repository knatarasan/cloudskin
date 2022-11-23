from rest_framework import generics
from .models import Graph
from .serializers import GraphSerializer
from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer


class MyObtainTokenPairViewSet(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GraphViewSet(viewsets.ModelViewSet):
    queryset = Graph.objects.all()
    serializer_class = GraphSerializer


class RegisterViewSet(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

#
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
