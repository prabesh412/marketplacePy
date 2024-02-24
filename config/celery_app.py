import os

from celery import Celery
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")

app = Celery("doshro_bazar")

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object("django.conf:settings", namespace="CELERY")

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()
app.conf.beat_schedule = {
    "fill_category": {
        "task": "doshro_bazar.category.tasks.fill_category",

        "schedule": crontab(minute=0, hour=0, day_of_month=1), 
    },

    "update_views": {
        "task": "doshro_bazar.listings.tasks.update_views",
        "schedule": 5*60*5, 
    },
    "get_all_categories": {
        "task": "doshro_bazar.listings.tasks.get_all_categories",
        "schedule": 60000, 
    },

}




