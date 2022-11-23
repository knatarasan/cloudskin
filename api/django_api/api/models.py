from django.db import models


# Create your models here.


class Graph(models.Model):
    owner = models.ForeignKey(
        'auth.User', related_name='graph', on_delete=models.CASCADE)
    graph = models.JSONField()

# class User(models.Model):
#     username = models.TextField()
#     email = models.EmailField()
#     password = models.S