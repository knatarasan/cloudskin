
### How to do "End to End Test" ?
1. User Registration
   -  GEORGE HOWARD
   -  george.howard@gmail.com
   -  user name : george
2. Create IAM User 
    - Create IAM User sc_user with sc_policy in aws
    - Update IAM User in stratoclo
3. Spin a EC2 instance
4. Check plan saved
5. Re-open the plan
6. Monitor EC2 
7. Terminate
8. Delete plan
9.  Delete IAM user and policy (sc_user, sc_policy) in aws
10. Clean up IAM user creds from stratoclo
11. Delete User from starto clo

### Regular PROD CD(Continuous Deployment)
[Refer deploy_in_aws_script](deploy_in_aws_script.sh)

### First time PROD deployment(Continuous Deployment)
[Refer deploy_in_aws_setup](deploy_in_aws_setup.sh)

- ## Add encryption keys
`python manage.py generate_rsa_keys_for_encryption`
This will create following files under the 

`cloudskin/api/django_api/config/`
    `private_key.pem public_key.pem`

