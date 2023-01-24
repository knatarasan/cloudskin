# CLOUD SKIN

## Development Installation Instruction

1. Download and install Python 3.9.13 version
2. Install PIP
   > `python -m pip install`
3. Change to project directory
4. Create virtual environment
   > `python -m venv venv`
5. Activate virtual environment
   > `.\venv\Scripts\activate`
6. Install required packages
   > `pip install -r config/requirements/local.txt`

Optional:  
To create initial data in DB, run after migration

> `python manage.py update_initial_data --settings=config.settings.production`

---

## Preferred Attributes and Methods Order in a Model

1. Constants (for choices and other)
2. Fields of the model
3. Custom manager indication
4. Meta
5. def **str** (python 3)
6. Other special methods
7. def clean
8. def save
9. def get_absolute_url
10. Other methods

## Python Coding Standards

![image](https://user-images.githubusercontent.com/1616291/176888457-17d1dcb9-10ff-470d-8d17-ffeedbc54889.png)

## Django Settings: Best practices

1. Keep settings in environment variables.
2. Write default values for production configuration (excluding secret keys and tokens).
3. Don’t hardcode sensitive settings, and don’t put them in VCS.
4. Split settings into groups: Django, third-party, project.
5. Follow naming conventions for custom (project) settings.

## DB Naming Convention

1. All table & column names should follow snake_case naming standard
2. All tables should have a primary key column defined.
   a. Primary key column name will be <table_name>\_id. Example, Customer table will have customer_id as primary key.
   b. Primary key column data will be auto generated integer column.
   c. Any need for pre formatted column shown to user / document will be captured in a separate column (enable unique constraint as required).
3. All tables should have below columns
   a. created_by
   b. created_timestamp
   c. last_modified_by
   d. last_modified_timestamp
   e. status_type
4. Foreign key references are preferred to be non-nullable.
5. DO NOT enable cascade delete on any foreign key reference. Any required logic to delete should be handled in the code.
6. Avoid deleting records as much as possible, instead use status_type column to handle deletes.
