from rest_framework import serializers
from doshro_bazar.listings.models import ListingImage, Listings
from doshro_bazar.users.api.serializers import UserSerializer

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = "__all__"


class ListingsSerializer(serializers.ModelSerializer):
    images = ListingImageSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
                    
    class Meta:
        model = Listings
        fields = "__all__"
        read_only_fields = ["user", "id", "slug", "created_at", "updated_at"]


class ListingsInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listings
        fields = "__all__"
        read_only_fields = ["user", "id", "slug", "created_at", "updated_at"]
       

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = "__all__"
