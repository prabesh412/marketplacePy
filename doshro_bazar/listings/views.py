from rest_framework import viewsets, status
from doshro_bazar.listings.models import Listings, ListingImage
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django_filters import rest_framework as filters_new
from doshro_bazar.listings.serializers import ListingsSerializer, ListingImageSerializer
from doshro_bazar.listings.filters import ListingsFilter




@extend_schema_view(
    retrieve=extend_schema(description="Returns the given Listing."),
    list=extend_schema(description="Return a list of all the existing listings."),
)
class ListingsViewSet(viewsets.ModelViewSet):
    queryset = Listings.objects.all()
    serializer_class = ListingsSerializer
    filter_backends = (filters_new.DjangoFilterBackend, )
    filterset_class = ListingsFilter



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

