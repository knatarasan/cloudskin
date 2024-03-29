# Generated by Django 3.2.17 on 2023-04-07 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aws', '0004_auto_20230404_1946'),
    ]

    operations = [
        migrations.AlterField(
            model_name='awscomponent',
            name='region',
            field=models.TextField(default='us-east-1'),
        ),
        migrations.AlterField(
            model_name='awscomponent',
            name='security_group',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='awscomponent',
            name='subnet',
            field=models.TextField(null=True),
        ),
    ]
