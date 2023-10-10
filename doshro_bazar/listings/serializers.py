from rest_framework import serializers
from doshro_bazar.listings.models import ListingImage, Listings
from doshro_bazar.users.api.serializers import UserSerializer

class ListingImageSerializer(serializers.ModelSerializer):
    image = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )

    class Meta:
        model = ListingImage
        fields = "__all__"

class ListingViewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = "__all__"
    
class ListingsSerializer(serializers.ModelSerializer):
    images = ListingViewImageSerializer( read_only=True, many=True)
    user = UserSerializer(read_only=True)
                    
    class Meta:
        model = Listings
        fields = "__all__"
        read_only_fields = ["slug", "created_at", "updated_at"]


class ListingsInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listings
        fields = "__all__"
        read_only_fields = [ "user","slug", "created_at", "updated_at"]

 

