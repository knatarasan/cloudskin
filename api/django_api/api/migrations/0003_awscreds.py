# Generated by Django 4.1.3 on 2022-12-05 15:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0002_ec2'),
    ]

    operations = [
        migrations.CreateModel(
            name='AwsCreds',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aws_access_key', models.TextField()),
                ('aws_access_secret', models.TextField()),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='aws_creds', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]