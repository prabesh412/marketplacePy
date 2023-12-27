from rest_framework import serializers
from doshro_bazar.bookmarks.models import Bookmark
from doshro_bazar.listings.serializers import ListingsSerializer

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]

class BookmarkProfileSerializer(serializers.ModelSerializer):
    listing = ListingsSerializer(read_only=True)
    class Meta:
        model = Bookmark
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]

class BookmarkInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]
