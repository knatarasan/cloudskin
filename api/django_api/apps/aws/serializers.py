import logging

from rest_framework import serializers

from .models.AWSComponent import LB, AWSComponent
from .models.AwsCreds import RSA, AwsCreds
from .models.EC2 import EC2
from .models.EC2MetaData import EC2MetaData
from .models.InstallableService import InstallableService
from .models.InstalledService import InstalledService

logger = logging.getLogger(__name__)


class AWSCompSerializer(serializers.ModelSerializer):
    class Meta:
        model = AWSComponent
        fields = ["id", "plan", "region", "security_group", "subnet", "date_created_or_modified"]


class InstallableServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstallableService
        fields = "__all__"


class InstalledServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstalledService
        fields = [
            "id",
            "service",
            "service_version",
            "service_port",
            "service_status",
            "ec2",
            "installable_service",
            "service_url",
            "service_error",
            "install_log",
            "date_created",
            "date_modified",
        ]


class EC2MetaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EC2MetaData
        fields = "__all__"


class EC2Serializer(serializers.ModelSerializer):
    # make sure to add related_name in model as installed_service
    installed_service = InstalledServiceSerializer(many=True, read_only=True)

    class Meta:
        model = EC2
        fields = [
            "id",
            "plan",
            "aws_component",
            "region",
            "security_group",
            "subnet",
            "date_created_or_modified",
            "ec2_instance_id",
            "ec2_status",
            "instance_type",
            "image_id",
            "instance_key_pair",
            "public_ip",
            "private_ip",
            "host_name",
            "installed_service",
        ]


class LBSerializer(serializers.ModelSerializer):
    class Meta:
        model = LB
        fields = [
            "id",
            "plan",
            "aws_component",
            "lb_instance_id",
            "lb_status",
            "lb_type",
            "region",
            "security_group",
            "subnet",
            "date_created_or_modified",
        ]


import base64

import rsa
from rest_framework import serializers


class RSAEncryptedField(serializers.Field):
    def __init__(self, key, **kwargs):
        self.key = rsa.PublicKey.load_pkcs1(key)
        super(RSAEncryptedField, self).__init__(**kwargs)

    def to_representation(self, value):
        ciphertext = base64.b64decode(value)
        plaintext = rsa.decrypt(ciphertext, self.key).decode("utf-8")
        return plaintext

    def to_internal_value(self, data):
        ciphertext = rsa.encrypt(data.encode("utf-8"), self.key)
        ciphertext_b64 = base64.b64encode(ciphertext).decode("utf-8")
        return ciphertext_b64


class RSADecryptedField(serializers.Field):
    def __init__(self, key, **kwargs):
        self.key = rsa.PrivateKey.load_pkcs1(key)
        super(RSADecryptedField, self).__init__(**kwargs)

    def to_representation(self, value):
        return value

    def to_internal_value(self, data):
        ciphertext = base64.b64decode(data)
        plaintext = rsa.decrypt(ciphertext, self.key).decode("utf-8")
        return plaintext


# class AwsCredsSerializer(serializers.ModelSerializer):
#     aws_access_key_de = serializers.SerializerMethodField()
#     aws_access_secret_de = serializers.SerializerMethodField()
#     aws_private_key_pair_pem_de = serializers.SerializerMethodField()

#     def get_aws_access_key_de(self, obj):
#         rsa = RSA()
#         return rsa.decrypt(obj.aws_access_key)

#     def get_aws_access_secret_de(self, obj):
#         rsa = RSA()
#         return rsa.decrypt(obj.aws_access_secret)

#     def get_aws_private_key_pair_pem_de(self, obj):
#         rsa = RSA()
#         return rsa.decrypt(obj.aws_private_key_pair_pem)

#     # def to_representation(self, instance):
#     #     instance = instance.get_decrypted(pk=instance.pk)
#     #     return super().to_representation(instance)

#     class Meta:
#         model = AwsCreds
#         # fields = "__all__"
#         exclude = ["owner"]
#         # read_only_fields = ["aws_access_key", "aws_access_secret", "aws_private_key_pair_pem"]
#         # With above convertion of read_only_fields could not be pick from front end

#         write_only_fields = ["aws_access_key", "aws_access_secret", "aws_private_key_pair_pem"]
#         read_only_fields = ["aws_access_key_de", "aws_access_secret_de", "aws_private_key_pair_pem_de"]


class AwsCredsSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    owner = serializers.ReadOnlyField(source="owner.username")
    aws_access_key_en = serializers.CharField(write_only=True)
    aws_access_secret_en = serializers.CharField(write_only=True)
    aws_private_key_pair_pem_en = serializers.CharField(write_only=True)
    aws_iam_user = serializers.CharField()
    aws_private_key_pair_pem_name = serializers.CharField()
    date_created = serializers.DateTimeField()
    date_modified = serializers.DateTimeField()
    aws_access_key = serializers.SerializerMethodField()
    aws_access_secret = serializers.SerializerMethodField()
    aws_private_key_pair_pem = serializers.SerializerMethodField()

    # Use following two ways to optimize it
    # https://medium.com/finnovate-io/using-custom-model-fields-to-encrypt-and-decrypt-data-in-django-8255a4960b72
    # RSAEncryptedField

    def get_aws_access_key(self, obj):
        rsa = RSA()
        return rsa.decrypt(obj.aws_access_key_en)

    def get_aws_access_secret(self, obj):
        rsa = RSA()
        return rsa.decrypt(obj.aws_access_secret_en)

    def get_aws_private_key_pair_pem(self, obj):
        rsa = RSA()
        return rsa.decrypt(obj.aws_private_key_pair_pem_en)

    def create(self, validated_data):
        """
        create and return a new `AwsCreds` , given the validated data
        """
        aws_creds = AwsCreds.objects.create(**validated_data)
        logger.info("AwsCreds created")
        return aws_creds

    def update(self, instance, validated_data):
        instance.aws_access_key = validated_data.get("aws_access_key_en", instance.aws_access_key)
        instance.aws_access_secret = validated_data.get("aws_access_secret_en", instance.aws_access_secret)
        instance.private_key_pair_pem = validated_data.get("private_key_pair_pem_en", instance.private_key_pair_pem)
        instance.aws_iam_user = validated_data.get("aws_iam_user", instance.aws_iam_user)
        instance.aws_private_key_pair_pem_name = validated_data.get(
            "aws_private_key_pair_pem_name", instance.aws_private_key_pair_pem_name
        )
        instance.save()
        return instance
