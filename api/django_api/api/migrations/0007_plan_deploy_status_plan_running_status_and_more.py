# Generated by Django 4.1.3 on 2022-12-31 14:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_planstatus'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='deploy_status',
            field=models.TextField(choices=[('Prepared', 'Prepared'), ('Deployed', 'Deployed')], null=True),
        ),
        migrations.AddField(
            model_name='plan',
            name='running_status',
            field=models.TextField(choices=[('Started', 'Started'), ('Running', 'Running'), ('Stopped', 'Stopped'), ('Failed', 'Failed')], null=True),
        ),
        migrations.DeleteModel(
            name='PlanStatus',
        ),
    ]