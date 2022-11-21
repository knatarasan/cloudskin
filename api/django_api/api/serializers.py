from rest_framework import serializers
from .models import Graph


class GraphSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    graph = serializers.JSONField()

    def create(self,validated_data):
        '''
        create and return a new `Graph` , given the validated data
        '''
        print('validated ',validated_data)
        return Graph.objects.create(**validated_data)

    def update(self,instance,validated_data):
        instance.graph = validated_data.get('graph',instance.graph)
        instance.save()
        return instance


