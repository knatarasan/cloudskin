
# connect to prod machine
# ssh -i ~/.ssh/cloudskin_key.pem ec2-user@ec2-54-183-97-140.us-west-1.compute.amazonaws.com
ssh -i ~/Downloads/react-deploy.pem ec2-user@ec2-54-193-41-186.us-west-1.compute.amazonaws.com

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
scp -i ~/Downloads/react-deploy.pem -r ~/workspace/cloudskin/react_cs/build/* ec2-user@ec2-54-193-41-186.us-west-1.compute.amazonaws.com:/tmp/build/
# scp -r -i ~/.ssh/cloudskin_key.pem build/* ec2-user@ec2-54-183-97-140.us-west-1.compute.amazonaws.com:/var/www/build/

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
tail -f /home/ec2-user/cloudskin/api/logs/app.log


# To generate RSA keys for encryption

# python manage.py generate_rsa_keys_for_encryption

# Above will create following files under the /home/ec2-user/cloudskin/api/django_api/config/:
#     private_key.pem
#     public_key.pem



# To deploy backup script
# crontab -e
# 0 21 * * * /bin/bash /tmp/pg_backup/pg_backup.sh >> /tmp/pg_backup/pg_backup.log 2>&1
# Also supply password




# To renew after 3 months ssl encrption renew 
[ec2-user@ip-172-31-15-28 ~]$ sudo certbot --nginx -d www.stratoclo.com
# Saving debug log to /var/log/letsencrypt/letsencrypt.log
# Plugins selected: Authenticator nginx, Installer nginx
# Cert not yet due for renewal

# You have an existing certificate that has exactly the same domains or certificate name you requested and isn't close to expiry.
# (ref: /etc/letsencrypt/renewal/www.stratoclo.com.conf)

# What would you like to do?
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# 1: Attempt to reinstall this existing certificate
# 2: Renew & replace the certificate (may be subject to CA rate limits)
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 2
# Renewing an existing certificate for www.stratoclo.com
# Could not automatically find a matching server block for www.stratoclo.com. Set the `server_name` directive to use the Nginx installer.

# IMPORTANT NOTES:
#  - Unable to install the certificate
#  - Congratulations! Your certificate and chain have been saved at:
#    /etc/letsencrypt/live/www.stratoclo.com/fullchain.pem
#    Your key file has been saved at:
#    /etc/letsencrypt/live/www.stratoclo.com/privkey.pem
#    Your certificate will expire on 2023-09-07. To obtain a new or
#    tweaked version of this certificate in the future, simply run
#    certbot again with the "certonly" option. To non-interactively
#    renew *all* of your certificates, run "certbot renew"
sudo systemctl restart nginx
------------------------------------

hint: Updates were rejected because the tip of your current branch is behind
https://stackoverflow.com/questions/39399804/updates-were-rejected-because-the-tip-of-your-current-branch-is-behind-its-remot
git pull --rebase origin <your_branch_name>
git push --rebase origin <your_branch_name>