from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter
from django.urls import include, path
from doshro_bazar.users.api.views import UserViewSet, RegisterViewSet, OTPViewSet, CustomLoginView

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)


app_name = "api"
urlpatterns = router.urls

urlpatterns += [
    path("accounts/", include("allauth.urls")),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/login/", CustomLoginView.as_view(), name="custom_login"),
    path("dj-rest-auth/register", RegisterViewSet.as_view({"post": "create"})),
    path("dj-rest-auth/otp", OTPViewSet.as_view({"post": "create"})),
]
