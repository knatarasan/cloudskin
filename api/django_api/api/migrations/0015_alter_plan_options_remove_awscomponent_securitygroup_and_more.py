# Generated by Django 4.1.3 on 2023-01-23 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_ec2_aws_component_lb_aws_component'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='plan',
            options={'ordering': ['id']},
        ),
        migrations.RemoveField(
            model_name='awscomponent',
            name='securityGroup',
        ),
        migrations.AddField(
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