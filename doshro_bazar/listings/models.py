from django.db import models
from doshro_bazar.utils.abstract_models import AbstractClient
import uuid
from django.utils.text import slugify
from django.db.models import F

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

    class ListingCondition(models.TextChoices):
        NEW = "NW", ("New")
        USED = "US", ("Used")
        LIKE_NEW = "LN", ("Like New")
        BRAND_NEW = "BN", ("Brand New")

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
    is_scraped = models.BooleanField(default=False, null=True, blank=True)
    is_featured = models.BooleanField(default=False, null=True, blank=True)
    link_to_original = models.CharField(max_length=255, null=True, blank=True)
    banner_image = models.CharField(max_length=255, null=True, blank=True)
    is_negotiable = models.BooleanField(default=True, null=True, blank=True)
    listing_condition = models.CharField(
        max_length=2, choices=ListingCondition.choices, default=ListingCondition.NEW
    )
    listing_features = models.JSONField(null=True, blank=True)
    is_sfw = models.BooleanField(default=True, null=True, blank=True)
    scraped_username = models.CharField(max_length=255, null=True, blank=True)
    scraped_views = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        already_exist = Listings.objects.filter(slug = self.slug)
        if not already_exist:
            self.slug = slugify(self.title)
        self.slug = self.slug + "-" + str(uuid.uuid4())[:8]

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
        