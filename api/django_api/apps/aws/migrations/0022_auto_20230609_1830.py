# Generated by Django 3.2.17 on 2023-06-09 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aws', '0021_alter_rds_rds_engine'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rds',
            name='rds_allocated_storage',
            field=models.IntegerField(default=5, null=True),
        ),
        migrations.AlterField(
            model_name='rds',
            name='rds_availability_zone',
            field=models.TextField(default='us-east-1b', null=True),
        ),
        migrations.AlterField(
            model_name='rds',
            name='rds_db_name',
            field=models.TextField(default='rdsdatabase', null=True),
        ),
        migrations.AlterField(
            model_name='rds',
            name='rds_engine',
            field=models.TextField(default='postgres', null=True),
        ),
        migrations.AlterField(
            model_name='rds',
            name='rds_engine_version',
            field=models.TextField(default='14.7', null=True),
        ),
        migrations.AlterField(
            model_name='rds',
            name='rds_instance_class',
            field=models.TextField(default='db.t3.micro', null=True),
        ),
        migrations.AlterField(
            model_name='rds',
            name='rds_master_user_password',
            field=models.TextField(default='postgres', null=True),
        ),
        migrations.AlterField(
            model_name='rds',
            name='rds_master_username',
            field=models.TextField(default='postgres', null=True),
        ),
    ]
