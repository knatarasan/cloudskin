# Generated by Django 3.2.17 on 2023-02-22 04:45

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('plan', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AWSComponent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('region', models.TextField(default='us-west-1')),
                ('security_group', models.TextField(default='sg-0f2b88c10abf752e3', null=True)),
                ('subnet', models.TextField(default='subnet-0a6da46fb837b5a32', null=True)),
                ('date_created_or_modified', models.DateTimeField(default=datetime.datetime.now)),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='aws_components', to='plan.plan')),
            ],
        ),
        migrations.CreateModel(
            name='EC2MetaData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('instance_type', models.CharField(max_length=100)),
                ('current_generation', models.BooleanField(null=True)),
                ('free_tier_eligible', models.BooleanField(null=True)),
                ('supported_usage_classes', models.JSONField(null=True)),
                ('supported_root_device_types', models.JSONField(null=True)),
                ('supported_virtualization_types', models.JSONField(null=True)),
                ('bare_metal', models.BooleanField(null=True)),
                ('hypervisor', models.CharField(max_length=100, null=True)),
                ('processor_info', models.JSONField(null=True)),
                ('vcpu_info', models.JSONField(null=True)),
                ('memory_info', models.JSONField(null=True)),
                ('network_info', models.JSONField(null=True)),
                ('placement_group_info', models.JSONField(null=True)),
                ('hibernation_supported', models.BooleanField(null=True)),
                ('burstable_performance_supported', models.BooleanField(null=True)),
                ('dedicated_hosts_supported', models.BooleanField(null=True)),
                ('auto_recovery_supported', models.BooleanField(null=True)),
                ('supported_boot_modes', models.JSONField(null=True)),
                ('region_code', models.CharField(max_length=100, null=True)),
                ('price_currency', models.CharField(max_length=3, null=True)),
                ('price', models.FloatField(null=True)),
                ('details', models.JSONField(null=True)),
            ],
            options={
                'db_table': 'ec2_metadata',
            },
        ),
        migrations.CreateModel(
            name='InstallableService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service_name', models.TextField(null=True)),
                ('service_version', models.TextField(null=True)),
                ('service_type', models.TextField(default='database', null=True)),
                ('service_os', models.TextField(default='centos', null=True)),
                ('service_port', models.IntegerField(null=True)),
                ('service_install_command', models.JSONField(null=True)),
                ('service_uninstall_command', models.JSONField(null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='EC2',
            fields=[
                ('awscomponent_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='aws.awscomponent')),
                ('aws_component', models.TextField(default='ec2')),
                ('ec2_instance_id', models.TextField(null=True)),
                ('ec2_status', models.IntegerField(choices=[(1, 'Prepared'), (2, 'Started'), (3, 'Stopped'), (4, 'Deleted'), (10, 'Running'), (-1, 'Failed'), (-2, 'Terminated')], default=1)),
                ('instance_type', models.TextField(default='t2.micro')),
                ('image_id', models.TextField(default='ami-0f5e8a042c8bfcd5e')),
                ('instance_key_pair', models.TextField(default='cloudskin_key')),
                ('public_ip', models.TextField(null=True)),
                ('private_ip', models.TextField(null=True)),
                ('host_name', models.TextField(null=True)),
            ],
            bases=('aws.awscomponent',),
        ),
        migrations.CreateModel(
            name='LB',
            fields=[
                ('awscomponent_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='aws.awscomponent')),
                ('aws_component', models.TextField(default='lb')),
                ('lb_instance_id', models.TextField(null=True)),
                ('lb_status', models.IntegerField(choices=[(1, 'Prepared'), (2, 'Started'), (3, 'Stopped'), (4, 'Deleted'), (10, 'Running'), (-1, 'Failed'), (-2, 'Terminated')], default=1)),
                ('lb_type', models.TextField(default='ALB')),
            ],
            bases=('aws.awscomponent',),
        ),
        migrations.CreateModel(
            name='AwsCreds',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aws_iam_user', models.TextField(null=True)),
                ('aws_access_key', models.TextField(null=True)),
                ('aws_access_secret', models.TextField(null=True)),
                ('aws_private_key_pair_pem_name', models.TextField(null=True)),
                ('aws_private_key_pair_pem', models.TextField(null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='aws_creds', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='InstalledService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service', models.TextField(default='postgres', null=True)),
                ('service_version', models.TextField(default='12.5', null=True)),
                ('service_port', models.IntegerField(default=5432, null=True)),
                ('service_status', models.IntegerField(choices=[(1, 'Prepared'), (2, 'Started'), (3, 'Stopped'), (4, 'Deleted'), (10, 'Running'), (-1, 'Failed'), (-2, 'Terminated')], default=1, null=True)),
                ('service_url', models.TextField(null=True)),
                ('service_error', models.TextField(null=True)),
                ('install_log', models.TextField(null=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
                ('installable_service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='installed_service', to='aws.installableservice')),
                ('ec2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='installed_service', to='aws.ec2')),
            ],
            options={
                'verbose_name': 'InstalledService',
                'verbose_name_plural': 'InstalledServices',
            },
        ),
    ]
