from django.db import models

class PG(models.Model):
    version = models.TextField(default='12')
    pg_instance_id = models.TextField(null=True)