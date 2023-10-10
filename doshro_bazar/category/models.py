from django.db import models
from doshro_bazar.utils.abstract_models import AbstractClient
from django.utils.text import slugify

class Category(AbstractClient):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, related_name="children", blank=True, null=True
    )

    def __str__(self):
        return self.name
    
    def get_all_children(self):
        return Category.objects.filter(parent=self)
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)