# Generated by Django 4.2.4 on 2023-12-17 10:55

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("category", "0002_category_id_from_api"),
    ]

    operations = [
        migrations.AddField(
            model_name="category",
            name="main_category_image",
            field=models.URLField(blank=True, default=None, max_length=255, null=True),
        ),
    ]
