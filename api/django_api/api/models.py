from django.db import models


# Create your models here.

class EC2(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='ec2', on_delete=models.CASCADE # When deleted, the ec2 instances created by the user should be terminated
    )
    ec2_instance_id = models.TextField()

class Graph(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='graph', on_delete=models.CASCADE
    )
    graph = models.JSONField()

    # def save(self, *args, **kwargs):
    #     graph =

# class User(models.Model):
#     username = models.TextField()
#     email = models.EmailField()
#     password = models.S