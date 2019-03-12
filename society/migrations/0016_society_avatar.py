# Generated by Django 2.1.4 on 2019-02-24 06:19

from django.db import migrations, models
import utils.staticmethods


class Migration(migrations.Migration):

    dependencies = [
        ('society', '0015_auto_20190216_0624'),
    ]

    operations = [
        migrations.AddField(
            model_name='society',
            name='avatar',
            field=models.ImageField(blank=True, height_field=512, null=True, upload_to=utils.staticmethods.avatar_storage_path, width_field=512),
        ),
    ]