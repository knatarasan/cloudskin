from django.db import models

class InstallableService(models.Model):
    """
    Model going to hold all services that can be installed on various OS
    """
    service_name = models.TextField(null=True)
    service_version = models.TextField(null=True)
    service_type = models.TextField(null=True,default='database')
    service_os = models.TextField(null=True,default='centos')
    service_port = models.IntegerField(null=True)
    service_install_command = models.JSONField(null=True)
    service_uninstall_command = models.JSONField(null=True)
    # service_start_command = models.JSONField(null=True)
    # service_stop_command = models.JSONField(null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

