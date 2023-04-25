
# connect to prod machine
ssh -i ~/.ssh/cloudskin_key.pem ec2-user@ec2-54-183-97-140.us-west-1.compute.amazonaws.com

# @prod machine
#
#   EXECUTE THESE IN PROD MACHINE
#

sudo rm -rf /var/www/build/*
sudo rm -rf /tmp/build/*

# make sure you have updated .env.production.local
# https://create-react-app.dev/docs/adding-custom-environment-variables/


# @dev machine
#
#   EXECUTE THESE IN DEV MACHINE
#

cd cloudskin/react_cs
npm run build
scp -i ~/.ssh/cloudskin_key.pem -r ~/workspace/cloudskin/react_cs/build/* ec2-user@ec2-54-183-97-140.us-west-1.compute.amazonaws.com:/tmp/build


# @prod machine
#
#   EXECUTE THESE IN PROD MACHINE
#

sudo cp -r /tmp/build/* /var/www/build/

ps -ef|grep manage
sudo kill -9 <PID>

source ~/.venv/bin/activate
cd ~/cloudskin/api/django_api
python manage.py makemigrations
python manage.py migrate

nohup ~/.venv/bin/python ~/cloudskin/api/django_api/manage.py runserver 0:8000 &
tail -f /home/ec2-user/cloudskin/api/log/app.log


# To generate RSA keys for encryption

# python manage.py generate_rsa_keys_for_encryption

# Above will create following files under the /home/ec2-user/cloudskin/api/django_api/config/:
#     private_key.pem
#     public_key.pem
