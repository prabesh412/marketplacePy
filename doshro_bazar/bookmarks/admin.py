from django.contrib import admin
from doshro_bazar.bookmarks.models import Bookmark

# Register your models here.
@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "listing"]

    list_per_page = 10

