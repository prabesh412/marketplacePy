# Generated by Django 4.2.4 on 2023-12-17 11:02

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("category", "0003_category_main_category_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="category",
            name="main_category_image",
            field=models.CharField(blank=True, default=None, max_length=255, null=True),
        ),
    ]
