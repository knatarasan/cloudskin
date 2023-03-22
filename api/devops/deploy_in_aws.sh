ssh -i ~/.ssh/cloudskin_key.pem ec2-user@ec2-54-183-97-140.us-west-1.compute.amazonaws.com


#1 SecurityGroup Inbound rules Any IP through HTTP

#2 install postgresql

# Used this link: https://blog.milliondollarserver.com/2018/09/install-postgresql-96-on-amazon-linux-2.html
sudo amazon-linux-extras install postgresql9.6
sudo yum install postgresql-server.x86_64
sudo systemctl enable postgresql.service
sudo /usr/bin/postgresql-setup initdb
sudo systemctl start postgresql

# manual
sudo su - postgres
psql postgres

# create user and database
CREATE DATABASE cs_db;
CREATE ROLE cs WITH LOGIN PASSWORD '<password>';
GRANT ALL PRIVILEGES ON DATABASE cs_db TO cs;

#manual
sudo vim /var/lib/pgsql/data/pg_hba.conf
  # "local" is for Unix domain socket connections only
  local   all             all                                     md5
  # IPv4 local connections:
  host    all             all             127.0.0.1/32            md5


# To connect with psql from laptop

#step1
sudo vim /var/lib/pgsql/data/postgresql.conf
listen_addresses = '*'

#step2   (73.189.104.117/32:    IP Address of ISP)
sudo vim /var/lib/pgsql/data/pg_hba.conf
host    all             all             73.189.104.117/32          md5


sudo systemctl restart postgresql

# To check login: psql postgresql://cs:cs@127.0.0.1:5432/cs_db


sudo yum install -y git
# git cone
https://knatarasan:<token>@github.com/knatarasan/cloudskin.git

python3 -m venv ~/.venv
source ~/.venv/bin/activate

echo 'AWS_TEST_MODE=False' > django_api/.env

#make sure 
# cat .env
# AWS_TEST_MODE=False
# CS_DATABASE_URL=postgres://cs:cs@localhost:5432/cs_db

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

python manage.py collectstatic

# For testing make sure the port number 0:8000
python manage.py runserver 0:8000
http://ec2-54-183-97-140.us-west-1.compute.amazonaws.com:8000/api/v1/


# How to uninstall postgres
# sudo yum remove postgresql postgresql-server
# sudo rm -rf /var/lib/psql

# Done until this


cd /home/ec2-user/cloudskin/api/django_api
gunicorn --bind localhost:8000 django_api.wsgi:application
sudo systemctl enable --now gunicorn.service


# Deploy react
    # https://blog.devgenius.io/using-nginx-to-serve-react-application-static-vs-proxy-69b85f368e6c
    # http://www.theappliedarchitect.com/deploying-react-in-production/
    # Global variables for REACT  https://medium.com/nerd-for-tech/get-global-variables-in-react-js-490cf68f2a73    

# from local machine
# update proxy in package.json file to point ec2 instance  Eg: "proxy": "http://54.193.172.190/:8000",

# @dev machine
npm run build

# @prod machine
sudo rm -rf /var/www/build/*
sudo rm -rf /tmp/build/*

# make sure you have updated .env.production.local
# https://create-react-app.dev/docs/adding-custom-environment-variables/


# @dev machine
scp -i ~/.ssh/cloudskin_key.pem -r ~/workspace/cloudskin/react_cs/build/* ec2-user@ec2-54-183-97-140.us-west-1.compute.amazonaws.com:/tmp/build
sudo cp -r /tmp/build/* /var/www/build/

#At remote machine
sudo amazon-linux-extras install -y nginx1

#update conf file of nginx
sudo vim /etc/nginx/nginx.conf
# Update webroot to /var/www/

#Configure following stuf in nginx.conf
'
server {
        listen       80;
        listen       [::]:80;
        server_name  ec2-54-183-97-140.us-west-1.compute.amazonaws.com;
        root         /var/www/build;
        location  /   {
                try_files $uri /index.html;
        }
        location /api {
                proxy_pass http://localhost:8000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }
'

sudo systemctl restart nginx

sudo rm -rf /var/www/build/*
sudo rm -rf /tmp/build/*

sudo cp -r /tmp/build/* /var/www/build/

nohup ~/.venv/bin/python ~/cloudskin/api/django_api/manage.py runserver 0:8000 &
tail -f /home/ec2-user/cloudskin/api/log/app.log

#Enable SSL
#https://www.youtube.com/watch?v=8huMBHx-TKY&ab_channel=Pentacode

#DNS config at Google Domains
#Host name          Type        TTL	        Data
#www.stratoai.app	    A	        1 hour	    54.183.97.140


sudo amazon-linux-extras install epel -y
sudo yum install -y certbot
sudo yum install -y certbot-nginx

sudo certbot --nginx -d www.stratoai.app

'
[ec2-user@ip-172-31-15-28 ~]$ sudo certbot --nginx -d www.stratoai.app
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator nginx, Installer nginx
Requesting a certificate for www.stratoai.app
Could not automatically find a matching server block for www.stratoai.app. Set the `server_name` directive to use the Nginx installer.

IMPORTANT NOTES:
 - Unable to install the certificate
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/www.stratoai.app/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/www.stratoai.app/privkey.pem
   Your certificate will expire on 2023-05-22. To obtain a new or
   tweaked version of this certificate in the future, simply run
   certbot again with the "certonly" option. To non-interactively
   renew *all* of your certificates, run "certbot renew"
'


#Error : Could not automatically find a matching server block for www.stratoai.app. Set the `server_name` directive to use the Nginx installer.
# since I didn't add server for 443

#Adding new server section addressed the issue
sudo vim /etc/nginx/nginx.conf
'
server {
        listen       80 ipv6only=off;
	      listen       [::]:80;
        server_name  ec2-54-183-97-140.us-west-1.compute.amazonaws.com;
        root         /var/www/build;
        location  /   {
          try_files $uri /index.html;
        }
        location /api {
          proxy_pass http://localhost:8000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
          location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }
    server {
      listen 443 ssl;
      server_name  ec2-54-183-97-140.us-west-1.compute.amazonaws.com;
      listen [::]:443 ssl;
      root 	/var/www/build;
      ssl_certificate /etc/letsencrypt/live/www.stratoai.app/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/www.stratoai.app/privkey.pem;

      location  /   {
        try_files $uri /index.html;
      }
          location /api {
            proxy_pass http://localhost:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      }
    }
'



#Ref https://certbot.eff.org/instructions?ws=nginx&os=centosrhel8
#ef https://community.letsencrypt.org/t/aws-linux-certbot-with-snapd/156255/5



# SSLify www.stratoclo.com

(.venv) [ec2-user@ip-172-31-15-28 django_api]$ sudo certbot --nginx -d www.stratoclo.com
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator nginx, Installer nginx
Requesting a certificate for www.stratoclo.com
Performing the following challenges:
http-01 challenge for www.stratoclo.com
Using default addresses 80 and [::]:80 ipv6only=on for authentication.
Waiting for verification...
Cleaning up challenges
Could not automatically find a matching server block for www.stratoclo.com. Set the `server_name` directive to use the Nginx installer.

IMPORTANT NOTES:
 - Unable to install the certificate
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/www.stratoclo.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/www.stratoclo.com/privkey.pem
   Your certificate will expire on 2023-05-27. To obtain a new or
   tweaked version of this certificate in the future, simply run
   certbot again with the "certonly" option. To non-interactively
   renew *all* of your certificates, run "certbot renew"


#sudo systemctl restart nginx







# Following not needed
#socat TCP-LISTEN:8000,fork TCP:127.0.0.1:80
#
#firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8000
#firewall-cmd  --remove-forward-port=port=80:proto=tcp:toport=8000
#
#firewall-cmd --runtime-to-permanent
#firewall-cmd --list-all

Backup SSL certificate:
scp -i ~/.ssh/cloudskin_key.pem -r ec2-user@ec2-54-183-97-140.us-west-1.compute.amazonaws.com:/tmp/*.pem ~/workspace/cloudskin/api/devops/SSL_config/
