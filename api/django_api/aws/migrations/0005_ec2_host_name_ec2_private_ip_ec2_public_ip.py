# Generated by Django 4.1.3 on 2023-02-01 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aws', '0004_awscreds_aws_private_key_pair_pem_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='ec2',
            name='host_name',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='ec2',
            name='private_ip',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='ec2',
            name='public_ip',
            field=models.TextField(null=True),
        ),
    ]
