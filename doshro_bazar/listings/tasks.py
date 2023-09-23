from celery import shared_task
from doshro_bazar.listings.models import ListingViews
from django.core.cache import cache

# @shared_task
# def update_views(listing_name):
#     views = cache.get('views')
#     if not views:
#         return 
    
    
    
