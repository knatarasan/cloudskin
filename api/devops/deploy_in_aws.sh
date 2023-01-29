ssh -i ~/.ssh/cloudskin_key.pem ec2-user@ec2-54-193-172-190.us-west-1.compute.amazonaws.com


#1 SecurityGroup Inbound rules Any IP through HTTP

#2 install postgresql

# Used this link: https://blog.milliondollarserver.com/2018/09/install-postgresql-96-on-amazon-linux-2.html
amazon-linux-extras install postgresql9.6
sudo yum install postgresql-server.x86_64
sudo systemctl enable postgresql.service
sudo /usr/bin/postgresql-setup --initdb
sudo systemctl start postgresql

# manual
sudo su - postgres
psql postgres

#manual
sudo vim /var/lib/pgsql/data/pg_hba.conf
  # "local" is for Unix domain socket connections only
  local   all             all                                     md5
  # IPv4 local connections:
  host    all             all             127.0.0.1/32            md5

# To check login: psql postgresql://cs:cs@127.0.0.1:5432/cs_db

sudo yum install -y git
# git cone
https://knatarasan:<token>@github.com/knatarasan/cloudskin.git

python3 -m venv ~/.venv
source ~/.venv/bin/activate

echo 'AWS_TEST_MODE=False' > django_api/.env
mkdir cloudskin/api/log

# How to uninstall postgres
#sudo yum remove postgresql postgresql-server
#sudo rm -rf /var/lib/psql

# For testing make sure the port number 0:8000
python manage.py runserver 0:8000

cd /home/ec2-user/cloudskin/api/django_api
gunicorn --bind localhost:8000 django_api.wsgi:application
sudo systemctl enable --now gunicorn.service


# Deploy react
    # https://blog.devgenius.io/using-nginx-to-serve-react-application-static-vs-proxy-69b85f368e6c
    # http://www.theappliedarchitect.com/deploying-react-in-production/
    # Global variables for REACT  https://medium.com/nerd-for-tech/get-global-variables-in-react-js-490cf68f2a73    

# from local machine
# update proxy in package.json file to point ec2 instance  Eg: "proxy": "http://54.193.172.190/:8000",

npm run build
scp -i ~/.ssh/cloudskin_key.pem -r ~/workspace/cloudskin/react_cs/build/* ec2-user@ec2-54-193-172-190.us-west-1.compute.amazonaws.com:/tmp/build

#At remote machine
sudo rm -rf /var/www/build/*
sudo rm -rf /tmp/build/*

sudo scp -r /tmp/build/* /var/www/build/

sudo service nginx stop
sudo service nginx start

/home/ec2-user/.venv/bin/python /home/ec2-user/cloudskin/api/django_api/manage.py runserver 0:8000 &
tail -f /home/ec2-user/cloudskin/api/log/app.log

socat TCP-LISTEN:8000,fork TCP:127.0.0.1:80

firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8000
firewall-cmd  --remove-forward-port=port=80:proto=tcp:toport=8000

firewall-cmd --runtime-to-permanent
firewall-cmd --list-all