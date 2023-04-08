from django.db import models


class SecurityGroup(models.Model):
    group_id = models.CharField(max_length=20)
    group_name = models.CharField(max_length=100)
    vpc = models.ForeignKey("VPC", on_delete=models.CASCADE)

    def __str__(self):
        return f"group_id: {self.group_id}, group_name:{self.group_name}"
