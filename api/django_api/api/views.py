from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from .serializers import GraphSerializer
from .models import Graph


class GraphViewSet(viewsets.ModelViewSet):
    queryset = Graph.objects.all()
    serializer_class = GraphSerializer
