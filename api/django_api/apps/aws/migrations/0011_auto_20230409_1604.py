# Generated by Django 3.2.17 on 2023-04-09 16:04

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plan', '0002_alter_plan_table'),
        ('aws', '0010_auto_20230408_0244'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vpc',
            name='internet_gateway_id',
        ),
        migrations.RemoveField(
            model_name='vpc',
            name='routes_table_id',
        ),
        migrations.AddField(
            model_name='vpc',
            name='internet_gateway_ids',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=21), null=True, size=None),
        ),
        migrations.AddField(
            model_name='vpc',
            name='plan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='vpc', to='plan.plan'),
        ),
        migrations.AddField(
            model_name='vpc',
            name='routes_table_ids',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=25), null=True, size=None),
        ),
    ]