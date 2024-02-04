from celery import shared_task
from django.core.cache import cache

from doshro_bazar.category.models import Category
from doshro_bazar.listings.models import Listings, ListingViews
from doshro_bazar.listings.scraper import scrape_listing_paginated


@shared_task
def update_views():
    views = cache.get('view', {})
    print(views , "views")
    
    if views is None:
        return None
    
    for slug, view in views.items():
        listing = ListingViews.objects.filter(listing_name = slug).first()
        if listing:
            listing.views += view
            listing.save()

    cache.delete('view')

def print_current_scraping_category(category_id):
    print(category_id, "current_category")


@shared_task
def get_all_categories():
    categories = Category.objects.all()
    category_id_list = []
    for category in categories:
        category_id_list.append(category.id_from_api)

    current_category = cache.get("current_category_to_scrape", {})
    if current_category == {}:
        cache.set("current_category_to_scrape", {"current_category": category_id_list[0]})
        print_current_scraping_category(category_id_list[0])
    
        is_scraped = scrape_listing_paginated(category_id_list[0])
        if is_scraped:
            cache.set("current_category_to_scrape", {"current_category": category_id_list[1]})
            return

    else:
        current_category = current_category["current_category"]
        index = category_id_list.index(current_category)
        print_current_scraping_category(current_category)
        if index < len(category_id_list) - 1:
            is_scraped = scrape_listing_paginated(current_category)
            if is_scraped:
                cache.set("current_category_to_scrape", {"current_category": category_id_list[index + 1]})
                return
        else:
            cache.delete("current_category_to_scrape")

    

    
    
    
