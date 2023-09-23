from celery import shared_task
from doshro_bazar.category.models import Category
from doshro_bazar.category.scraper import scrape_categories, fill_category_db



@shared_task
def fill_category():
    categories = scrape_categories()
    fill_category_db(categories)

    return categories

