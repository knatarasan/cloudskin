### api
- [X] Initialize django api setup
- [X] Take react_flow json object and save it into DB
- [ ] Authentication
  - Backend
    - [X] Backend - registration/login - [Used this documentation:](https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5)
    - [ ] make above saved object to user specific
    - [ ] User clicks `deploy` button, deployment steps starts
  - Frontend
    - [ ] Make service calls to registration and login api
    - [ ] Build React UI for registration and login
- [ ] Follow actions
  - [ ] add App, execute necessary backend tasks 
    1.  EC2
        1. Create and prep EC2
            1. Choose VM type (vCPU & memory )
            2. Choose image type 
                1. OS : user chooses
                2. Type of OS
            3. Storage : disk equivalent 
            4. SG : configure SG ( fully automated when LB is used , only open required ports for ingress and egress)
            5.  ssh key configuration
        2. Deployment
            1. Install OS packages
            2. Prep python venv
            3. Clone git repo
            4. Pip install requirements.txt
        3. Install and run nginx
        4. Configure Django with nginx through Guinicorn.     : Status : if you hit EC2 ( IP/aws url ) the application up and running


