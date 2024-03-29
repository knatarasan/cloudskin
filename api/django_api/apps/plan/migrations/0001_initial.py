# Generated by Django 3.2.17 on 2023-02-22 04:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_currentuser.db.models.fields
import django_currentuser.middleware
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('record_status', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Active'), (2, 'InActive')], default=1)),
                ('created_datetime', models.DateTimeField(auto_now_add=True)),
                ('last_modified_datetime', models.DateTimeField(auto_now=True, null=True)),
                ('plan_id', models.AutoField(primary_key=True, serialize=False)),
                ('plan_no', models.TextField(default=uuid.uuid4, editable=False, unique=True)),
                ('plan', models.JSONField(null=True)),
                ('deploy_status', models.IntegerField(choices=[(1, 'Prepared'), (2, 'Deployed'), (0, 'Failed')], null=True)),
                ('running_status', models.IntegerField(choices=[(1, 'Started'), (2, 'Running'), (3, 'Stopped'), (0, 'Failed')], null=True)),
                ('created_by', django_currentuser.db.models.fields.CurrentUserField(db_index=False, default=django_currentuser.middleware.get_current_authenticated_user, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('last_modified_by', django_currentuser.db.models.fields.CurrentUserField(db_index=False, default=django_currentuser.middleware.get_current_authenticated_user, null=True, on_delete=django.db.models.deletion.PROTECT, on_update=True, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plan', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'plan',
                'ordering': ['-last_modified_datetime'],
            },
        ),
    ]
