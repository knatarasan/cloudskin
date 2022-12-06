
- [X] Initialize django api setup
- [X] Take react_flow json object and save it into DB
- [ ] Authentication
  - Backend
    - [X] Backend - registration/login - [Used this documentation:](https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5)
    - [X] make above saved object to user specific
    - [ ] User clicks `deploy` button, deployment steps starts
  - Frontend
    - [ ] Make service calls to registration and login api
    - [ ] Build React UI for registration and login
- [ ] Follow actions
  - [ ] add App, execute necessary backend tasks 
    - [ ]   EC2
        - [ ] Create and prep EC2
            - [X] Built a simple service with hardcoded value to create an EC2
              - Hardcoded values are [VM type,ami,storage,Security Group, ssh key config]
            - [ ]  Choose VM type (vCPU & memory )
            - [ ]  Choose image type (ami) 
                - [ ]  OS : user chooses
                - [ ]  Type of OS
            - [ ]  Storage : disk equivalent 
            - [ ]  SG : configure SG ( fully automated when LB is used , only open required ports for ingress and egress)
            - [ ]   ssh key configuration
              - [ ] boto3: from customer create a user `for_cloudskin`
              - [X] api: create model and expose API to accomadate User AWS Access Key and AWS  Secret into DB
          
        - [ ]  Deployment
            - [ ]  Install OS packages
            - [ ]  Prep python venv
            - [ ]  Clone git repo
            - [ ]  Pip install requirements.txt
        - [ ]  Install and run nginx
        - [ ]  Configure Django with nginx through Guinicorn.     : Status : if you hit EC2 ( IP/aws url ) the application up and running


