
from rest_framework import serializers
from .models import Graph, EC2, AwsCreds
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from .services import EC2Service
import logging

logger = logging.getLogger('django')

class GraphSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
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


class EC2Serializer(serializers.Serializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    ec2_instance_id = serializers.CharField()
    ec2_instance_health = serializers.SerializerMethodField()

    def get_ec2_instance_health(self, obj):
        service = EC2Service()
        return service.get_health(obj.ec2_instance_id)

    def create(self, validated_data):
        '''
        create and return a new `EC2` , given the validated data
        '''
        logger.info(f"validated data {validated_data}")
        ec2 = EC2.objects.create(**validated_data)
        logger.info("EC2 created")
        return ec2

    def update(self, instance, validated_data):
        instance.ec2 = validated_data.get('ec2_instance_id', instance.ec2_instance_id)
        instance.save()
        logger.info("EC2 updated")
        return instance


class AwsCredsSerializer(serializers.Serializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    aws_access_key = serializers.CharField()
    aws_access_secret = serializers.CharField()

    def create(self, validated_data):
        '''
        create and return a new `AwsCreds` , given the validated data
        '''
        aws_creds = AwsCreds.objects.create(**validated_data)
        logger.info("AwsCreds created")
        return aws_creds

    def update(self, instance, validated_data):
        instance.aws_access_key = validated_data.get('aws_access_key', instance.aws_access_key)
        instance.aws_access_secret = validated_data.get('aws_access_secret', instance.aws_access_secret)
        instance.save()
        logger.info("AwsCreds updated")
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        return token


class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'password2',
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
