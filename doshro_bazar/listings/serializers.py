from rest_framework import serializers
from .models import ListingImage, Listings

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = "__all__"


class ListingsSerializer(serializers.ModelSerializer):
    images = ListingImageSerializer(many=True, read_only=True)

    class Meta:
        model = Listings
        fields = "__all__"
        read_only_fields = ["user", "id", "slug", "created_at", "updated_at"]
       