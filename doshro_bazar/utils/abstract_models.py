from django.db import models


class AbstractClient(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True

    @classmethod
    def get_field_names(cls):
        return [f.name for f in cls._meta.get_fields()]
