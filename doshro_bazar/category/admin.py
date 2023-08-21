from django.contrib import admin
from doshro_bazar.category.models import Category

# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "parent"]
    list_filter = ["name", "slug", "parent"]
    search_fields = ["name", "slug", "parent"]
    list_per_page = 10
