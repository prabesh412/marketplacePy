from django.contrib import admin
from doshro_bazar.listings.models import Listings, ListingImage

# Register your models here.


@admin.register(Listings)
class ListingsAdmin(admin.ModelAdmin):
    list_display = ["title", "price", "status", "sale_status", "category", "user"]
    list_filter = ["status", "sale_status", "category", "user"]
    search_fields = ["title", "price", "status", "sale_status", "category", "user"]
    list_per_page = 10

@admin.register(ListingImage)
class ListingImageAdmin(admin.ModelAdmin):
    list_display = ["image", "listing"]
    list_filter = ["image", "listing"]
    search_fields = ["image", "listing"]
    list_per_page = 10
    
