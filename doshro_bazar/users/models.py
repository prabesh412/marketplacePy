from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from doshro_bazar.utils.abstract_models import AbstractClient
from django.db import models
from cloudinary.models import CloudinaryField

class User(AbstractUser):

    # First and last name do not cover name patterns around the globe
    name = CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore
    image = models.ImageField(upload_to='images/', blank=True)

    def get_absolute_url(self) -> str:
        
        return reverse("users:detail", kwargs={"username": self.username})




class OTP(AbstractClient):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    used = models.BooleanField(default=False)
    code = models.CharField(max_length=6, blank=True, null=True)