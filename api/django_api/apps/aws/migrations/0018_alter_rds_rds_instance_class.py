# Generated by Django 3.2.17 on 2023-06-09 01:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aws', '0017_auto_20230609_0129'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rds',
            name='rds_instance_class',
            field=models.TextField(default='db.t3.micro'),
        ),
    ]
