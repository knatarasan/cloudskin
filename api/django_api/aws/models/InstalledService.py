from django.db import models
import paramiko
from io import StringIO
from .AWSComponent import AWSComponent
from .AwsCreds import AwsCreds
import logging

# from .EC2 import EC2
logger = logging.getLogger(__name__)


class InstalledService(models.Model):
    """
    Model to store installed service
    This is a potential candidate to move out of aws app and into a separate installed service app
    """
    service = models.TextField(null=True, default='postgres')
    service_version = models.TextField(null=True, default='12.5')
    service_port = models.IntegerField(null=True, default=5432)
    service_status = models.IntegerField(null=True, choices=AWSComponent.AWSCompStatus.choices,
                                         default=AWSComponent.AWSCompStatus.PREPARED)
    ec2 = models.ForeignKey('aws.EC2', related_name='installed_service', on_delete=models.CASCADE)
    installable_service = models.ForeignKey('InstallableService', related_name='installed_service',
                                            on_delete=models.CASCADE)
    service_url = models.TextField(null=True)
    service_error = models.TextField(null=True)
    install_log = models.TextField(null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def get_ssh(self):
        # retrives the private key from the database
        # TODO enable decrypt on  private key here
        private_key_str = AwsCreds.objects.get(owner=self.ec2.plan.owner).aws_private_key_pair_pem
        private_key_io_stream = StringIO(private_key_str)
        private_key = paramiko.RSAKey.from_private_key(private_key_io_stream)

        # Connect to the EC2 instance using the hostname (or IP address) and the username
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        # TODO admin user can come from the database
        ssh.connect(hostname=self.ec2.host_name, port=22, username='ec2-user', pkey=private_key)
        return ssh

    def install_service(self):

        # Run commands to install PostgreSQL on the EC2 instance
        error = []
        stdouts = []

        with self.get_ssh() as ssh:
            for command in self.installable_service.service_install_command:
                logger.debug(f"Running command {command}")
                stdin, stdout, stderr = ssh.exec_command(command)
                # TODO Scan stderr for error
                if stderr.read():
                    error.append('command :' + command + ' err: ' + str(stderr.read()))
                else:
                    stdouts.append(stdout.read())

        self.service_error = str(error)
        self.install_log = str(stdouts)

        self.service_url = self.ec2.host_name + ':' + str(self.service_port)
        self.service_status = AWSComponent.AWSCompStatus.RUNNING
        self.save()

    def uninstall_service(self):
        # Run commands to uninstall a service from EC2 instance
        error = []
        stdouts = []

        with self.get_ssh() as ssh:
            for command in self.installable_service.service_uninstall_command:
                logger.debug(f"****   Start command {command}")
                stdin, stdout, stderr = ssh.exec_command(command)
                # TODO Scan stderr for error

                #TODO Known bug(#43) control stuck at stderr.read()
                # if stderr.read():
                #     logger.debug(f"****   in std err {command}")
                #     error.append('command :' + command + ' err: ' + str(stderr.read()))
                # else:
                #     logger.debug(f"****   in std out {command}")
                #     stdouts.append(stdout.read())


        self.service_error = str(error)
        self.install_log = str(stdouts)

        self.service_url = self.ec2.host_name + ':' + str(self.service_port)
        self.service_status = AWSComponent.AWSCompStatus.PREPARED
        self.save()
        logger.debug(f"****   After save")
        return 'uninstalled'

    def __str__(self):
        return f"{self.service} {self.service_version} {self.service_port} {self.service_url} {self.service_status} {self.ec2}"

    class Meta:
        verbose_name = 'InstalledService'
        verbose_name_plural = 'InstalledServices'
