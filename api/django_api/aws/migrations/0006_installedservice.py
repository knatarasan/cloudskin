# Generated by Django 4.1.3 on 2023-02-01 18:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('aws', '0005_ec2_host_name_ec2_private_ip_ec2_public_ip'),
    ]

    operations = [
        migrations.CreateModel(
            name='InstalledService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service', models.TextField(default='postgres', null=True)),
                ('service_version', models.TextField(default='12.5', null=True)),
                ('service_port', models.IntegerField(default=5432, null=True)),
                ('service_status', models.IntegerField(choices=[(1, 'Prepared'), (2, 'Started'), (3, 'Stopped'), (4, 'Deleted'), (10, 'Running'), (-1, 'Failed')], default=1)),
                ('service_url', models.TextField(null=True)),
                ('service_install_command', models.JSONField()),
                ('service_uninstall_command', models.JSONField()),
                ('service_error', models.TextField(null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
                ('ec2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='install_service', to='aws.ec2')),
            ],
            options={
                'verbose_name': 'InstalledService',
                'verbose_name_plural': 'InstalledServices',
            },
        ),
    ]