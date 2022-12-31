from django.db import models


# Create your models here.

class EC2(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='ec2', on_delete=models.CASCADE # When deleted, the ec2 instances created by the user should be terminated
    )
    ec2_instance_id = models.TextField(null=True)

class Plan(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='plan', on_delete=models.CASCADE
    )
    plan = models.JSONField()

class AwsCreds(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='aws_creds', on_delete=models.CASCADE
    )
    aws_access_key = models.TextField()
    aws_access_secret = models.TextField()

