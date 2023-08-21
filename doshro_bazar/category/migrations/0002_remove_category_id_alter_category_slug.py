# Generated by Django 4.2.4 on 2023-08-19 17:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("category", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="category",
            name="id",
        ),
        migrations.AlterField(
            model_name="category",
            name="slug",
            field=models.SlugField(max_length=255, primary_key=True, serialize=False, unique=True),
        ),
    ]