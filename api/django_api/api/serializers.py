from rest_framework import serializers
from .models import Graph
import json


class GraphSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    graph = serializers.JSONField()

    def create(self,validated_data):
        '''
        create and return a new `Graph` , given the validated data
        '''
        graph = Graph.objects.create(**validated_data)

        return graph

    def update(self,instance,validated_data):
        instance.graph = validated_data.get('graph',instance.graph)
        instance.save()
        return instance


