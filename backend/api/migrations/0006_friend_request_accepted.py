# Generated by Django 3.0.8 on 2020-07-12 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20200712_1351'),
    ]

    operations = [
        migrations.AddField(
            model_name='friend_request',
            name='accepted',
            field=models.BooleanField(default=False),
        ),
    ]