from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save

from doshro_bazar.listings.models import ListingViews, Listings

@receiver(pre_save, sender=Listings)
def create_listing_view(sender, instance, **kwargs):
    if not instance.views:
        instance.views = ListingViews.objects.create(listing_name = instance.slug, views = 0)
    