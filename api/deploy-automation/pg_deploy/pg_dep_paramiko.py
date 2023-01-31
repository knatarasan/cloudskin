import paramiko
from io import StringIO

private_key_str = """-----BEGIN RSA PRIVATE KEY-----
..
..
-----END RSA PRIVATE KEY-----"""

private_key_io_stream = StringIO(private_key_str)
# Load the private key file (in .pem format)
# private_key = paramiko.RSAKey.from_private_key_file('/Users/kannappannatarasan/.ssh/cloudskin_key.pem')
private_key = paramiko.RSAKey.from_private_key(private_key_io_stream)

# Connect to the EC2 instance using the hostname (or IP address) and the username
ssh = paramiko.SSHClient()

ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(hostname='ec2-54-67-64-83.us-west-1.compute.amazonaws.com', port=22, username='ec2-user', pkey=private_key)

# Run commands to install PostgreSQL on the EC2 instance
stdin, stdout, stderr = ssh.exec_command('sudo yum update')
stdin, stdout, stderr = ssh.exec_command('sudo yum install -y postgresql-server')
stdin, stdout, stderr = ssh.exec_command('sudo /usr/bin/postgresql-setup initdb')
stdin, stdout, stderr = ssh.exec_command('sudo systemctl start postgresql')
stdin, stdout, stderr = ssh.exec_command('sudo systemctl enable postgresql')

stdin, stdout, stderr = ssh.exec_command('sudo yum remove -y vim')
# print('Are you ok', stdin, stdout., stderr)
print('std out', stdout.read())
print('------------')
print('std err', stderr.read())

# Close the connection
stdin.close()
ssh.close()

