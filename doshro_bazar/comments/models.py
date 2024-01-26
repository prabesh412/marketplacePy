from django.db import models
from doshro_bazar.utils.abstract_models import AbstractClient
from django.utils.text import slugify


class Comments(AbstractClient):
    texts = models.TextField()
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="comments"
    )
    listing = models.ForeignKey(
        "listings.Listings", on_delete=models.CASCADE, related_name="comments"
    )
    replies = models.JSONField(null=True, blank=True)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="child_comments"
    )
    top_parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="top_child_comments"
    )

    

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Comments"
        verbose_name = "Comment"
        