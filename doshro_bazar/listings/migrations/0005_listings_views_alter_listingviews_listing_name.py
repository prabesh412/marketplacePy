# Generated by Django 4.2.4 on 2023-10-13 11:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("listings", "0004_remove_listings_views"),
    ]

    operations = [
        migrations.AddField(
            model_name="listings",
            name="views",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="listing_views",
                to="listings.listingviews",
            ),
        ),
        migrations.AlterField(
            model_name="listingviews",
            name="listing_name",
            field=models.SlugField(default="", max_length=500, unique=True),
        ),
    ]
