from django.contrib.auth import get_user_model
from rest_framework import serializers

from doshro_bazar.users.models import User as UserType

User = get_user_model()


class UserSerializer(serializers.ModelSerializer[UserType]):
    image = serializers.ImageField(required=False)
    number_of_listings = serializers.IntegerField(read_only=True)
    number_of_bookmark = serializers.IntegerField(read_only=True)
    number_of_comments = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = ["username", "name", "image", "number_of_listings", "number_of_bookmark", "number_of_comments"]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "username"},
        }

class CommentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "name", "image"]

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "name", "password","image"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            name=validated_data["name"],
            password=validated_data["password"],
            is_active=False,
        )
        return user


class OTPValidationSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=10)
    otp = serializers.CharField(max_length=6)