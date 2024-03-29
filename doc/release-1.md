Release 1 
===========
    Objective : Customer deploys a PG in AWS very comfortably and manages

#### website story board  ** COMPLETED **
	- Landing page
		[logo, about, contact]
		- [What we can offer]: 
			- No code cloud deployment
			- One click deployment
			- Best practices applied [you can focus on your business]
		
	- Sign up (register) , Login
	- Logged In 
		- Dashboard
			- Create a Plan 
				- Save plan
				- Deploy plan

			- List Plan
				- Show status of plan
				- Edit plan
				- re-deploy
### ui to back end flow

- Plan :
  - Composed of
    - EC2 : 
      - Front end image has its equivalent backend class
      - Once dragged and dropped , an object is created in backend

![img.png](img.png)

##### References
1. [Authentication tutorial](https://medium.com/@sushil-kamble/django-rest-framework-react-authentication-workflow-2022-part-1-a21f22b3f358)
2. [Enable swagger documentation for django restframework ](https://www.jasonmars.org/2020/04/22/add-swagger-to-django-rest-api-quickly-4-mins-without-hiccups/)
3. [Implement Authorization in DRF Django Rest Framework](https://testdriven.io/blog/drf-permissions/)
4. [Core params to create postgres](https://pgtune.leopard.in.ua/)
5. [How to prepare IAM user](https://src-bin.com/an-aws-account-just-for-getting-into-other-aws-accounts/)
6. [skin for cloud from GCP](https://cloud.google.com/blog/topics/developers-practitioners/introducing-google-cloud-architecture-diagramming-tool)
7. [React Router and Link](https://www.freecodecamp.org/news/react-router-tutorial/)

Business
1. [Startup checklist ](https://artistic-aura-eff.notion.site/The-Startup-Checklist-89ae7a59975b4064b4a9fff146f2ce4c)
#### User flow

User --> login --> www.cs.io -->
	- create new plan
		- save
		- deploy
	[ PG is deployed up and running in his AWS  Account ] 

#### Functional 

	- PG (drag n drop)
	- Choose OS (suggested Linux with version ) Amazon linux 
	- Option to select EC2 VM type ( RAM , vCPU)
		- Choose disk 
			- SSD is default : user chooses the size  ( all other configs are default)

	- Base configs
		- Number of connections
		- Backup requirements collected ( to be taken care)
			- Scheduled back up 
			- Back up stored in s3
			- (Back up validation )

		- DB version (Defaulted)
	- Save ( a json cloud agnostic, cs-json )
	
	- Deploy
		- cs-json 
			-> Transformer (A knowledge base has to be applied)-> aws json [ used for deploy, monitor and manage]
			- Create EC2
			- Configure SG
			- Install PG   (Single instance or cluster)
			- Configure PG
			[-> Transformer -> azure json]
		- should deploy above configs irrespective cloud ( AWS, GCP, Azure)
[	- Monitor
	- Manage	] Enhancements


APP [VM]
	{ 
		- Backend
			- Installation/deployment script
				- python env 
				- wsgi 
				- DB config, Security Group config
			- Operational script
		- Front end
			- Installation script
			- Operational script
			
	}

	github
		- Installation script
		- Operational script 

------------------------------------------------------------------

### Tasks
#### UI
- Build basic flow using bootstrap
- Build React flow
  - signup
  - login
  - dashboard 
    - List of plan 
    - plan (enhance existing one)
- Enahance edit plan page
  - Drag n Drop Icon : Add properties page right side
  - Properties
    - OS
      - version OS
    - hardware (aws)
      - instance type
      - hard disk
      - AMI
    - DB
      - flavor (eg: pg) 
      - version
      - backup
  - Add Deploy button

PG
	- save plan
	- update plan
	- deploy

#### API

##### create and maintain plan

- post: v1/plan/
  -`{ os:'linux', 
         hardware:{ instance_type:,storage:'ssd',ami:'myami'},
         db: {flavor:'pg',version:'15',backup:'needed'}
       }`
  - creates the plan
- put: v1/plan/{plan_id}
  - updates plan
- delete: v1/plan/
  - deletes the plan
- get: v1/plan/{plan_id}
  - specic plan
- get : v1/plan/ 
    - list of all plans

##### deploy and maintain
- post: v1/plan/{plan_id}/deploy/
  - deploys the plan
    - new deployment : if there is no deployment for this plan
    - re-deploy : if there is a deployment for this plan



##### Deploy cycle

- [ ] Plan level deployment
  - [ ] user -> create plan -> Add EC2 -> deploy EC2 from right bar -> Terminate EC2 from right bar
  - [ ] user -> Addes PG on EC2 -> configure PG -> Deploy PG -> Remove PG

  - [X] Create plan
  - [X]  Add components
  - [X]  Configure components
  - [X]  Click "Deploy Plan" -> Deploy triggered in backend  [Indiator for deployment]
    - [ ] Traverse through plan components and call deployment
    - [X] EC2 deployment completed
      - [X] EC2 creation API calls updated to command based 
      - [ ] Once EC2 created UI has to be updated with instance id
      - [ ] Augment ec2_status with text based status 
      - [ ] monitor EC2 health
      - [ ] Terminate instance
        - [ ] If EC2 Icon can be deleted : only when underlying EC2 is terminated
      - [ ] [what happens if deployment fails]
      - [ ] [what happens if deployment is in progress]

    - [O] PG deployment
    - [ ] Deploy PG 
    - [ ] Monitor PG
  - [ ]  After succesfull deployment front end updated
  - [ ]  Monitoring get triggered for components
  - [ ]  "Deploy Plan " : button disabled when there is no deployment



- [ ] Take over an existing VPC
  - [ ] Graph all the components
- [ ] Monitoring : 
  - [ ]  Gray empty circle not deployed 
  - [ ]  Orange : deploying (opitonal)
  - [ ]  Green : running
  - [ ]  red : Have some issues ( eg: SG not configured )
    

  
### Tasks for release 1

- CloudCanvas code -restruct
  - Include store for all the components 

    - UI Changes
      - EC2 and installed services : Icon has to be enhanced

    - RightSideBar : when PG clicked, should edit only PG
      - Enhanced JSON editor

    - Monitoring
      - After deployment update componentwise status on near by square
  
- No save button anywere
- PG
  - PG best practice configs 
  - After PG is dropped SG ports has to be opened, if PG is accessed outside of EC2.

- EC2
  - Key pair creation
  - Listing all instance types from AWS --> DB
    - Build rest api end point `api/v1/aws_metadata/ec2/refresh` to return all ec2 instance metadata
      - This command has to be cron scheduled to run every week.    
      - A model under aws app `EC2_Metadata` holds this data
      - create `iam-policy` , `iam-user`  and assign this policy  to collect any data from aws
      - Create boto3 api call to collect all ec2 instance metadata from aws
        - metadata includes instance type, vcpu, memory, etc
        - `EC2_Metadata` is a SCD2 type table 
          - processing logic: 

##### Existing data in `EC2_Metadata`          
| sno | ec2_type | region    | price     | effective_date      | end_date            |
| --- | -------- | --------- | --------- | ------------------- | ------------------- |
| 1   | t2-micro | us-west-1 | 0.001 USD | 05/02/2021 12:00:00 | 31/12/9999 23:59:59 |

##### Today's extracted data from aws
| sno | ec2_type | region    | price                                    | today_date          |
| --- | -------- | --------- | ---------------------------------------- | ------------------- |
| 1   | t2-micro | us-west-1 | <span style="color:red">0.002 USD</span> | 05/05/2021 12:00:00 |

##### After processing :  `EC2_Metadata`

| sno | ec2_type | region    | price     | effective_date      | end_date            |
| --- | -------- | --------- | --------- | ------------------- | ------------------- |
| 1   | t2-micro | us-west-1 | 0.001 USD | 05/02/2021 12:00:00 | 05/05/2021 12:00:00 |
| 1   | t2-micro | us-west-1 | 0.002 USD | 05/05/2021 12:00:00 | 31/12/9999 23:59:59 |

  - Listing all AMI from AWS --> DB
  - Region selection AWS --> DB
  - Listing storage configs
  - Security group creation and configuration - Changes based on installed services and APP
    - For eg: If PG is installed then port 5432 has to be opened

- Deploy Plan
  - Show IAM user creation page, if ACCESS_KEY and SECRET_KEY is not provided
  - Deploy dependancy


- Landing page requirements
  - Logo
  - Company name
  - Landing page theme : White background Thin Orange lines

    

#### Securing Keys

https://arctype.com/blog/transparent-data-encryption/
https://towardsaws.com/hack-aws-ec2-catch-aws-account-15517ffe5450
https://www.lepide.com/blog/the-15-most-common-types-of-cyber-attacks/
https://systemweakness.com/how-to-get-started-hacking-django-applications-f407564df9c7
- [how to hack OS process](https://medium.com/@holdengrissett/linux-101-how-to-hack-your-process-memory-2514a3d0778d)


#### Start up support

https://cloud.google.com/startup
https://aws.amazon.com/activate/

#### logo : landing page design

https://looka.com/s/114880341

looka - logo generator

visme.co - for infographics generation

http://colormind.io/ - for color palette generation



### FAQ

- Why stratoclo is secure ?
  - Key handling
  - Data Handling
  - Monitoring assets


Continue from Store