from django.db import models
from doshro_bazar.utils.abstract_models import AbstractClient
# Create your models here.

class Bookmark(AbstractClient):
    listing = models.ForeignKey('listings.Listings', on_delete=models.CASCADE, related_name="bookmarks")
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="bookmarks")

    def __str__(self):
        return self.user.username

    class Meta:
        unique_together = ('listing', 'user',)