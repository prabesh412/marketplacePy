from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from django.core.cache import cache
from doshro_bazar.users.models import User


@receiver(post_save, sender=User)
def create_listing_view(sender, instance,created, **kwargs):
    if not created:  
        cache.set(f"profile_{instance.id}", instance.name)
    
    