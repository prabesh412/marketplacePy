from rest_framework import viewsets, status
from doshro_bazar.listings.models import Listings, ListingImage
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django_filters import rest_framework as filters_new
from doshro_bazar.listings.serializers import ListingsSerializer, ListingsInputSerializer, ListingImageSerializer
from doshro_bazar.listings.filters import ListingsFilter
from django.shortcuts import get_object_or_404
from django.core.cache import cache


@extend_schema_view(
    retrieve=extend_schema(description="Returns the given Listing."),
    list=extend_schema(description="Return a list of all the existing listings."),
)
class ListingsViewSet(viewsets.ModelViewSet):
    queryset = Listings.objects.all()
    serializer_class = ListingsSerializer
    filter_backends = (filters_new.DjangoFilterBackend, )
    filterset_class = ListingsFilter


    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return ListingsInputSerializer
        return super().get_serializer_class()


    def retrieve(self, request, pk=None, *args, **kwargs ):
        instance = self.get_object() 
        view = cache.get("view", {})
        if instance.slug in view:
            view[instance.slug] += 1
        else:
            view[instance.slug] = 1
        cache.set("view", view)
        print(view)
        return super().retrieve(request, *args, **kwargs)
    

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "You are not authorized to create a listing."}, status=status.HTTP_401_UNAUTHORIZED)
        print("user",request.user)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
   

class ListingImageViewSet(CreateModelMixin, GenericViewSet):
    queryset = ListingImage.objects.all()
    serializer_class = ListingImageSerializer
    filter_backends = (filters_new.DjangoFilterBackend, )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        listing = Listings.objects.get(id=request.data["listing"])
        if listing.user != request.user:
            return Response({"message": "You are not authorized to add image to this listing."}, status=status.HTTP_401_UNAUTHORIZED)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

