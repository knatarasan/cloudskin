# Generated by Django 3.2.17 on 2023-06-09 02:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('aws', '0018_alter_rds_rds_instance_class'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rds',
            old_name='rds_db_id',
            new_name='rds_db_identifier',
        ),
    ]
