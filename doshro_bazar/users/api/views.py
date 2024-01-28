import random

from dj_rest_auth.views import LoginView
from django.contrib.auth import get_user_model
from django.db.models import Count
from drf_spectacular.utils import OpenApiExample, OpenApiParameter, OpenApiTypes, extend_schema, extend_schema_view
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_extensions.cache.decorators import cache_response

from doshro_bazar.users.models import OTP
from doshro_bazar.utils.cache_utils import ProfileKeyConstructor
from doshro_bazar.utils.TwilioClient import MessageHandler

from .serializers import OTPValidationSerializer, UserRegisterSerializer, UserSerializer

User = get_user_model()

class CustomLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        try:
            username = request.data["username"]
            user = User.objects.get(username=username)

        except User.DoesNotExist:
            return Response({"detail": "User does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        if not user.is_active:
            return Response({"detail": "User is not active."}, status=status.HTTP_400_BAD_REQUEST)
        response = super().post(request, *args, **kwargs)
        
        return response


class UserViewSet(UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "username"

    def get_queryset(self, *args, **kwargs):
        assert isinstance(self.request.user.id, int)
        return self.queryset.filter(id=self.request.user.id)
    

    def retrieve(self, request, *args, **kwargs):
        try:
            # Attempt to convert the username to an integer
            username = int(kwargs.get('username'))
            # Find the user with this ID
            user_with_listing_count = User.objects.annotate(
                            number_of_listings=Count('listings', distinct=True),
                            number_of_bookmark=Count('bookmark', distinct=True),
                            number_of_comments=Count('comments', distinct=True),
                        ).get(username=username)
            data = UserSerializer(user_with_listing_count, context={"request": request}).data
            
            return Response(status=status.HTTP_200_OK, data=data)
        except ValueError:
            # If the conversion fails, return a 400 Bad Request response
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Invalid username - must be a number"})
        except User.DoesNotExist:
            # If no user is found, return a 404 Not Found response
            return Response(status=status.HTTP_404_NOT_FOUND, data={"message": "User not found"})
       
    
    # @cache_response(key_func=ProfileKeyConstructor())
    @action(detail=False, methods=["GET"])
    def me(self, request):
        user_data = User.objects.annotate(
                            number_of_listings=Count('listings', distinct=True),
                            number_of_bookmark=Count('bookmark', distinct=True),
                            number_of_comments=Count('comments', distinct=True),
                        ).get(id=request.user.id)
        
        serializer = UserSerializer(user_data, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)


def generate_otp(user):
    otp_code = random.randint(10000, 99999)
    OTP.objects.create(user=user, code=otp_code)
    return otp_code

class RegisterViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        generated_otp = generate_otp(serializer.instance)
        MessageHandler(serializer.instance.username, generated_otp).send_otp_via_message()
        return Response({"message": "OTP sent for verification!"}, status=status.HTTP_201_CREATED,)
       
    
class OTPViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = OTPValidationSerializer
    queryset = OTP.objects.all()

    def create(self, request, *args, **kwargs):
        user = User.objects.get(username=request.data["phone_number"])
        otp = OTP.objects.get(user=user)
        if otp.used:
            return Response({"message": "OTP already used!"}, status=status.HTTP_400_BAD_REQUEST,)
        if otp.code == request.data["otp"]:
            user.is_active = True
            otp.used = True
            otp.save() 
            user.save()
            return Response({"message": "User verified!"}, status=status.HTTP_200_OK,)
        else:
            return Response({"message": "Wrong OTP!"}, status=status.HTTP_400_BAD_REQUEST,)