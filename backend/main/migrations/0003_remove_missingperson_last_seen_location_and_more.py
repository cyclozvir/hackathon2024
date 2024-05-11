# Generated by Django 5.0.6 on 2024-05-11 20:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_remove_missingperson_last_seen_location_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='missingperson',
            name='last_seen_location',
        ),
        migrations.CreateModel(
            name='MissingPersonLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('missing_person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.missingperson')),
            ],
        ),
        migrations.DeleteModel(
            name='Location',
        ),
    ]
