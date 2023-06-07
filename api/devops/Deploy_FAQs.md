
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


## Product Road map
  - Site reliability : 
    - Backup postgresql
    - EC2 (Should able to create an workable AMI from set up script) worst case  AMI backup 
  - Backward compatability: 
    - customer A saved a plan on v0.1 and edits the sampe plan using v0.2
      - Compatability has to be thought through UI (frontend) + API(backend) + DB(persistance)
      - Else when you promote updated code, you need migrate existing plans saved using older software
  - Finding Beta customer
    - Product hunt : Look for options to promote
      - Get more upvote, reviews and comments
  - Markeing
    - Possible ideas
      - An utility to make create IAM policy easier
      - Visual AWS blogs : Convert your pencil drawings into Info graphic

  - Features:
    - Intiutiveness :
      - AWS is intiutive : for those who started AWS first
      - Azure is  intiutive : for those who started Azure first
    - Following is common deployment pattern : 1) EC2 - App   2) EC2 - DB
  
  - Landing page
    - [O] Update contact info in landing page
    - [X] Add Google Analytics

