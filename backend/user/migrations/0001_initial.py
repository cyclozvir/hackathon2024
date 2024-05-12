# Generated by Django 5.0.6 on 2024-05-12 01:33

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('role', models.CharField(choices=[('seeker', 'seeker'), ('reporter', 'reporter'), ('manager', 'manager')], default='reporter', max_length=50)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'permissions': [('view', 'Can view specific page'), ('edit', 'Can edit content'), ('comment', 'Can comment'), ('create_new', 'Can create new user')],
            },
        ),
        migrations.CreateModel(
            name='Seeker',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('age', models.IntegerField(default=0)),
                ('gender', models.CharField(choices=[('male', 'male'), ('female', 'female'), ('not specified', 'not specified')], default='not specified', max_length=100)),
                ('occupation', models.CharField(max_length=100)),
            ],
            options={
                'abstract': False,
            },
            bases=('user.customuser',),
        ),
        migrations.CreateModel(
            name='SeekerLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('seeker', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='user.seeker')),
            ],
        ),
    ]
