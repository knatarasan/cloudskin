import paramiko

# Create an SSH client
client = paramiko.SSHClient()

# Add the remote host's SSH key
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

hostname = 'ec2-50-18-27-77.us-west-1.compute.amazonaws.com'
username = 'ec2-user'
password = 'password'

# Connect to the remote host
client.connect(hostname=hostname, username=username, password=password)

# Update the package manager
stdin, stdout, stderr = client.exec_command('sudo apt-get update')

# Install PostgreSQL
stdin, stdout, stderr = client.exec_command('sudo apt-get install postgresql postgresql-contrib')

# check status of the service
stdin, stdout, stderr = client.exec_command('sudo service postgresql status')

# start the service
stdin, stdout, stderr = client.exec_command('sudo service postgresql start')

# Close the connection
client.close()
