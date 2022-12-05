from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Graph, EC2
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
import logging

logger = logging.getLogger('django')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    graph = serializers.HyperlinkedRelatedField(view_name='graph-detail',read_only=True)

    class Meta:
        model = User
        fields = ['url','id', 'username', 'graph']

class GraphSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    graph = serializers.JSONField()

    def create(self, validated_data):
        '''
        create and return a new `Graph` , given the validated data
        '''
        logger.info("Graph saved")
        graph = Graph.objects.create(**validated_data)

        return graph

    def update(self, instance, validated_data):
        instance.graph = validated_data.get('graph', instance.graph)
        instance.save()
        logger.info("Graph updated")
        return instance

    class Meta:
        model=Graph
        fields=['url', 'id', 'owner', 'graph']

class EC2Serializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    ec2_instance_id = serializers.CharField()

    def create(self, validated_data):
        '''
        create and return a new `Graph` , given the validated data
        '''
        ec2 = EC2.objects.create(**validated_data)
        logger.info("EC2 created")
        return ec2

    def update(self, instance, validated_data):
        instance.ec2 = validated_data.get('ec2', instance.ec2)
        instance.save()
        logger.info("EC2 updated")
        return instance

    class Meta:
        model = EC2
        fields=['url', 'id', 'owner', 'ec2_instance_id']



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
