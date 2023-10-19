from django.db import models
from doshro_bazar.utils.abstract_models import AbstractClient
import uuid
from django.utils.text import slugify
from django.db.models import F, Sum

# Create your models here.

class Listings(AbstractClient):
    class StatusChoices(models.TextChoices):
        DRAFT = "DF", ("Draft")
        PUBLISHED = "PB", ("Published")
        DENIED = "DN", ("Denied")

    class SaleStatus(models.TextChoices):
        SOLD = "SL", ("Sold")
        OPEN = "ON", ("OPEN")
        REMOVED = "RD", ("Removed")

    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=2, choices=StatusChoices.choices, default=StatusChoices.DRAFT
    )
    sale_status = models.CharField(
        max_length=2, choices=SaleStatus.choices, default=SaleStatus.OPEN
    )
    category = models.ForeignKey(
        "category.Category", on_delete=models.CASCADE, related_name="listings"
    )
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="listings"
    )
    location = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=255, null=True, blank=True)
    slug = models.SlugField(max_length=500, default = None, blank = True, unique=True, primary_key = True)
    views = models.ForeignKey('listings.ListingViews', on_delete=models.CASCADE, related_name="listing_views", null=True, blank=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Listings, self).save(*args, **kwargs)


class ListingImage(AbstractClient):
    image = models.ImageField(upload_to="listing_images")
    listing = models.ForeignKey(
        Listings, on_delete=models.CASCADE, related_name="images"
    )

    def __str__(self):
        return self.listing.title
    

class ListingViews(AbstractClient):
    listing_name = models.SlugField(max_length = 500, default = "",unique = True)
    views = models.IntegerField(default = 0)

    def __str__(self):
        return self.listing_name
    
    def update_views(self, increment = 1):
        obj = ListingViews.objects.filter(listing_name = self.listing_name)
        obj.update(views = F('views')+ increment)
        