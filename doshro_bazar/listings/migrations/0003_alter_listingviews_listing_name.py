# Generated by Django 4.2.4 on 2023-10-13 10:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0002_listings_views"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listingviews",
            name="listing_name",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="listing_name", to="listings.listings"
            ),
        ),
    ]
