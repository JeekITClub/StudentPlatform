# Generated by Django 2.1.4 on 2019-02-14 04:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('society_manage', '0005_creditreceivers_available'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='creditreceivers',
            options={'ordering': ['-year', '-semester']},
        ),
    ]