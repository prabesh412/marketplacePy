# Generated by Django 4.2.4 on 2023-10-13 10:43

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0003_alter_listingviews_listing_name"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="listings",
            name="views",
        ),
    ]
