# Sample Repo: https://github.com/knatarasan/hello-react
Run these commands after you set up EC2:
    # Use this to install shasum
    sudo yum update
    sudo yum install perl-Digest-SHA
    shasum -v

    # Use this to install dotnet core
    sudo rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
    sudo yum install -y dotnet-sdk-7.0

# To create a runner
1. Go to Settings -> Actions -> Runners -> New self-hosted runner
    Follow steps:
    sudo ./svc.sh install
    sudo ./svc.sh start


2. Install Nginx
# Use this to install nginx
sudo dnf install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

3. Change root directory in /etc/nginx/nginx.conf to /usr/share/nginx/html/build
sudo vim /etc/nginx/nginx.conf
sudo systemctl restart nginx


4. Create a new workflow as Node.js and for the yml file use this:
'''
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: React CI

on:
  push:
    branches: [ deploy ]

jobs:
  build:

    runs-on: self-hosted

    strategy:
      matrix:
        node-version: [16.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
        cache-dependency-path: front-end/package-lock.json
    - run: npm i
      working-directory: front-end
    - run: npm test
      working-directory: front-end    
    - run: npm run build
      working-directory: front-end    
    - run: sudo rm -rf /usr/share/nginx/html/build/
      working-directory: front-end    
    - run: sudo mv /home/ec2-user/test-react/_work/hello-react/hello-react/front-end/build /usr/share/nginx/html
    # - run: sudo systemctl restart nginx
'''

# https://www.youtube.com/watch?v=encpjND99xU&ab_channel=AnsontheDeveloper

# To set up Front End
1. [EC2] Make an EC2 instance on cloudsur and ssh into it
2. [Github Actions] Make a runner on github actions 
3. [EC2] setup on the ssh machine
4. [EC2] Install and configure nginx with above steps on the ssh machine
5. [Github Actions] Make a new workflow and use the above yml file (change names and other stuff)
