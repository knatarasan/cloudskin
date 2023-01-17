
from rest_framework import serializers
from .models import Plan, EC2, AwsCreds
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth.password_validation import validate_password
from .services import EC2Service
import logging

logger = logging.getLogger(__name__)

class PlanSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    owner = serializers.ReadOnlyField(source='owner.username')
    plan = serializers.JSONField()
    deploy_status = serializers.IntegerField()
    running_status = serializers.IntegerField()

    def create(self, validated_data):
        '''
        create and return a new `Plan` , given the validated data
        '''
        plan = Plan.objects.create(**validated_data)
        return plan

    def update(self, instance, validated_data):
        instance.plan = validated_data.get('plan', instance.plan)
        instance.save()
        return instance

class EC2Serializer(serializers.ModelSerializer):
    class Meta:
        model = EC2
        fields = ['id', 'owner', 'ec2_instance_id', 'ec2_status', 'instance_type', 'image_id', 'region', 'securityGroup', 'subnet','date_created_or_modified']



# class EC2Serializer(serializers.Serializer):
#     owner = serializers.ReadOnlyField(source='owner.username')
#     ec2_instance_id = serializers.CharField()
#     ec2_instance_health = serializers.SerializerMethodField()
#
#     def get_ec2_instance_health(self, obj):
#         service = EC2Service()
#         return service.get_health(obj.ec2_instance_id)
#
#     def create(self, validated_data):
#         '''
#         create and return a new `EC2` , given the validated data
#         '''
#         logger.info(f"validated data {validated_data}")
#         ec2 = EC2.objects.create(**validated_data)
#         logger.info("EC2 created")
#         return ec2
#
#     def update(self, instance, validated_data):
#         instance.ec2 = validated_data.get('ec2_instance_id', instance.ec2_instance_id)
#         instance.save()
#         logger.info("EC2 updated")
#         return instance


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


class CSTokenObtainPairSerializer(TokenObtainPairSerializer):
    """ It's an inherited class to augment JWT payload """
    @classmethod
    def get_token(cls, user):
        """ This class method is overloaded to augment username and email into JWT token payload """
        token = super(CSTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        return token


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    """ Executed during /token/refresh endpoint needed to set httpOnly from backend """
    refresh = None

    def validate(self, attrs):
        """ when /token/refresh endpoint is called,
        picks the refresh token from httpOnly cookie and returns an access token
        """
        logger.debug(f'context request {self.context["request"].COOKIES}')
        attrs["refresh"] = self.context["request"].COOKIES.get("refresh_token")
        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid token found in cookie 'refresh_token'")


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
