# Generated by Django 4.1.3 on 2023-01-17 05:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_ec2_date_created_or_modified_ec2_ec2_status_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ec2',
            name='owner',
        ),
        migrations.AddField(
            model_name='ec2',
            name='plan',
            field=models.ForeignKey(default=151, on_delete=django.db.models.deletion.PROTECT, related_name='aws_components', to='api.plan'),
            preserve_default=False,
        ),
    ]