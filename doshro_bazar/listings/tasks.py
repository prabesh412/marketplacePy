from celery import shared_task
from doshro_bazar.listings.models import ListingViews, Listings
from django.core.cache import cache

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


    

    
    
    
