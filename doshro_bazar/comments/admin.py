from django.contrib import admin
from doshro_bazar.comments.models import Comments

# Register your models here.

@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display = ["texts", "user", "listing", "parent"]
    list_filter = ["texts", "user", "listing", "parent"]
    search_fields = ["texts", "user", "listing", "parent"]
    list_per_page = 10