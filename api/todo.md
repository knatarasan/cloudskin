### api
-[X] Initialize django api setup
- [ ] save graph
  - [ ] Take react_flow json object and save it into DB
- [ ] login/logout
  - [ ] make above saved object to user specific
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
