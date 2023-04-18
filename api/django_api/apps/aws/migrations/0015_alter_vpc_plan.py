# Generated by Django 3.2.17 on 2023-04-18 04:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('plan', '0002_alter_plan_table'),
        ('aws', '0014_auto_20230409_1857'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vpc',
            name='plan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='vpc', to='plan.plan'),
        ),
    ]
