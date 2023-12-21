# Generated by Django 4.2.4 on 2023-12-21 14:41

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0007_listings_banner_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="listings",
            name="is_negotiable",
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
        migrations.AddField(
            model_name="listings",
            name="is_sfw",
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
        migrations.AddField(
            model_name="listings",
            name="listing_condition",
            field=models.CharField(
                choices=[("NW", "New"), ("US", "Used"), ("LN", "Like New"), ("BN", "Brand New")],
                default="NW",
                max_length=2,
            ),
        ),
        migrations.AddField(
            model_name="listings",
            name="listing_features",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
