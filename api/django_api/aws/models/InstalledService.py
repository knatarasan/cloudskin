from django.db import models
import paramiko
from io import StringIO
from .AWSComponent import AWSComponent
from .AwsCreds import AwsCreds
from .EC2 import EC2
import logging

logger = logging.getLogger(__name__)


class InstalledService(models.Model):
    """
    Model to store installed service
    This is a potential candidate to move out of aws app and into a separate installed service app
    """
    service = models.TextField(null=True,default='postgres')
    service_version = models.TextField(null=True,default='12.5')
    service_port = models.IntegerField(null=True,default=5432)
    service_status = models.IntegerField(choices=AWSComponent.AWSCompStatus.choices,default=AWSComponent.AWSCompStatus.PREPARED )
    ec2 = models.ForeignKey(EC2, related_name='install_service', on_delete=models.CASCADE)
    service_url = models.TextField(null=True)
    service_install_command = models.JSONField(null=True)
    service_uninstall_command = models.JSONField(null=True)
    service_error = models.TextField(null=True)
    install_log = models.TextField(null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def install_service(self):
        # retrives the private key from the database
        # TODO enable decrypt on  private key here
        private_key_str = AwsCreds.objects.get(owner=self.ec2.plan.owner).aws_private_key_pair_pem
        logger.debug(f"private key {private_key_str}")
        private_key_io_stream = StringIO(private_key_str)
        private_key = paramiko.RSAKey.from_private_key(private_key_io_stream)

        # Connect to the EC2 instance using the hostname (or IP address) and the username
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        #TODO admin user can come from the database
        ssh.connect(hostname=self.ec2.host_name, port=22, username='ec2-user',pkey=private_key)

        # Run commands to install PostgreSQL on the EC2 instance
        # stdin, stdout, stderr = ssh.exec_command('sudo yum update')
        # stdin, stdout, stderr = ssh.exec_command('sudo yum install -y postgresql-server')
        # stdin, stdout, stderr = ssh.exec_command('sudo /usr/bin/postgresql-setup initdb')
        # stdin, stdout, stderr = ssh.exec_command('sudo systemctl start postgresql')
        # stdin, stdout, stderr = ssh.exec_command('sudo systemctl enable postgresql')

        error = []
        stdouts = []
        for command in self.service_install_command:
            logger.debug(f"Running command {command}")
            stdin, stdout, stderr = ssh.exec_command(command)
            # TODO Scan stderr for error
            if stderr.read():
                error.append('command :'+command+' err: '+str(stderr.read()))
            else:
                stdouts.append(stdout.read())


        self.service_error = str(error)
        self.install_log = str(stdouts)

        self.service_url = self.ec2.host_name + ':' + str(self.service_port)
        self.service_status = AWSComponent.AWSCompStatus.RUNNING
        self.save()
        # stdin, stdout, stderr = ssh.exec_command('sudo yum remove -y vim')

        # Close the connection
        stdin.close()
        ssh.close()

    def __str__(self):
        return f"{self.service} {self.service_version} {self.service_port} {self.service_url} {self.service_status} {self.ec2}"



    class Meta:
        verbose_name = 'InstalledService'
        verbose_name_plural = 'InstalledServices'