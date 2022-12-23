Release 1 
===========
    Objective : Customer deploys a PG in AWS very comfortably and manages

#### website story board
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
