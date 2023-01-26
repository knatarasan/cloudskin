from datetime import datetime
from django.db import models
from django.utils.translation import gettext_lazy as _
import logging
from plan.models import Plan
import rsa

logger = logging.getLogger(__name__)


class AWSComponent(models.Model):
    """
    This is a base clas which forms one-to-one with child . Ref : https://docs.djangoproject.com/en/4.1/topics/db/models/#abstract-base-classes
    """
    plan = models.ForeignKey(
        Plan, related_name='aws_components', on_delete=models.PROTECT
    )
    region = models.TextField(default="us-west-1")
    security_group = models.TextField(null=True)
    subnet = models.TextField(null=True)
    date_created_or_modified = models.DateTimeField(default=datetime.now)

    class AWSCompStatus(models.IntegerChoices):
        PREPARED = 1
        STARTED = 2  # Create Instance
        STOPPED = 3  # Stop Instance
        DELETED = 4  # Delete Instance
        RUNNING = 10
        FAILED = -1


class EC2(AWSComponent):
    """
    Model inheritance. Ref : https://docs.djangoproject.com/en/4.1/topics/db/models/#model-inheritance
    """
    aws_component = models.TextField(default='ec2')
    ec2_instance_id = models.TextField(null=True)
    ec2_status = models.IntegerField(choices=AWSComponent.AWSCompStatus.choices,
                                     default=AWSComponent.AWSCompStatus.PREPARED)
    instance_type = models.TextField(default='t2.micro')
    image_id = models.TextField(default='ami-0f5e8a042c8bfcd5e')

    def __str__(self):
        return f'id:{str(self.id)}  plan: {str(self.plan)}  id: {self.ec2_instance_id} type:{self.instance_type}  status:{self.ec2_status}'


class LB(AWSComponent):
    aws_component = models.TextField(default='lb')
    lb_instance_id = models.TextField(null=True)
    lb_status = models.IntegerField(choices=AWSComponent.AWSCompStatus.choices,
                                    default=AWSComponent.AWSCompStatus.PREPARED)

    class LBType(models.TextChoices):
        ALB = 'ALB', _('alb')
        NLB = 'NLB', _('nlb')
        GLB = 'GLB', _('glb')

    lb_type = models.TextField(default=LBType.ALB)

    def __str__(self):
        return f'id:{str(self.id)}  plan: {str(self.plan)}  id: {self.lb_instance_id} type:{self.lb_type}  status:{self.lb_status}'


#
# cloud_type : aws
# iam policy (cx supplied)
# aws iam user (this user uses above policy)
# AWS_ACCESS_KEY_ID="PLACEHOLDER"
# AWS_SECRET_ACCESS_KEY="PLACEHOLDER"
# [ AWS Account]
# security_group : hisSecurityGroup
# subnetId : hisSubnet
# region_name=us-west-1
# EC2 instance
# ImageId=ami-0f5e8a042c8bfcd5e
# Instance type (eg: t2.micro)
# RAM
# vCPU

class RSA:
    def __init__(self):
        # generate public and private keys with
        # rsa.newkeys method,this method accepts
        # key length as its parameter
        # key length should be atleast 16

        self.publicKey, self.privateKey = rsa.newkeys(512)

    def encrypt(self, accessKeys):
        # rsa.encrypt method is used to encrypt
        # string with public key string should be
        # encode to byte string before encryption
        # with encode method
        encMessage = rsa.encrypt(accessKeys.encode(),
                                 self.publicKey)

        return encMessage

    def decrypt(self, encMessage):
        # the encrypted message can be decrypted
        # with ras.decrypt method and private key
        # decrypt method returns encoded byte string,
        # use decode method to convert it to string
        # public key cannot be used for decryption
        decMessage = rsa.decrypt(encMessage, self.privateKey).decode()

        print("decrypted string: ", decMessage)
        return decMessage


class AwsCreds(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='aws_creds', on_delete=models.CASCADE
    )
    aws_access_key = models.TextField()
    aws_access_secret = models.TextField()

    # TODO to implement encrypt and decrypt aws_access_key and aws_access_secert
    # def save(self, *args, **kwargs):
    #     rsa = RSA()
    #     self.aws_access_key = rsa.encrypt(self.aws_access_key)
    #     self.aws_access_secret = rsa.encrypt(self.aws_access_secret)
    #     super(AwsCreds, self).save(*args, **kwargs)

