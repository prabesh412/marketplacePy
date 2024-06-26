from django.core.cache import cache
from django.db.models import Count, Exists, OuterRef
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters_new
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import pagination, status, viewsets
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_extensions.cache.decorators import cache_response

from doshro_bazar.bookmarks.models import Bookmark
from doshro_bazar.listings.filters import ListingsFilter
from doshro_bazar.listings.models import ListingImage, Listings
from doshro_bazar.listings.serializers import ListingImageSerializer, ListingsInputSerializer, ListingsSerializer


@extend_schema_view(
    retrieve=extend_schema(description="Returns the given Listing."),
    list=extend_schema(description="Return a list of all the existing listings."),
)
class ListingsViewSet(viewsets.ModelViewSet):
    queryset = Listings.objects.all().select_related( "user", "views", "category").prefetch_related("images").annotate(
        number_of_bookmark=Count('bookmarks', distinct=True),
    )
    serializer_class = ListingsSerializer
    filter_backends = (filters_new.DjangoFilterBackend, )
    filterset_class = ListingsFilter
    pagination_class = pagination.PageNumberPagination

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return ListingsInputSerializer
        return super().get_serializer_class()
    
    def get_queryset(self):
        if self.request.user.is_authenticated and self.action in ["list", "retrieve"]:
            user = self.request.user
            bookmark_subquery = Bookmark.objects.filter(
                listing=OuterRef('pk'), user=user)
            return self.queryset.annotate(is_bookmarked=Exists(bookmark_subquery))
        return self.queryset
    
    def list(self, request, *args, **kwargs):
       return super().list(self, request, *args, **kwargs)


    # @cache_response(60 * 30)
    def retrieve(self, request, pk=None, *args, **kwargs ):
        instance = get_object_or_404(self.queryset, slug = pk)
        view = cache.get("view", {})
        if instance.slug in view:
            view[instance.slug] += 1
        else:
            view[instance.slug] = 1

        cache.set("view", view)
        return super().retrieve(request, *args, **kwargs)
    

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "You are not authorized to create a listing."}, status=status.HTTP_401_UNAUTHORIZED)
        print("user",request.user)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

    @action(detail=False)
    def me(self, request):
        if not request.user.is_authenticated:
            return Response({"message": "You are not authorized."}, status=status.HTTP_401_UNAUTHORIZED)
        queryset = self.queryset.filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
   

class ListingImageViewSet(CreateModelMixin, GenericViewSet):
    queryset = ListingImage.objects.all()
    serializer_class = ListingImageSerializer
    filter_backends = (filters_new.DjangoFilterBackend, )
    parser_classes = ( MultiPartParser,)

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        listing = Listings.objects.get(slug=request.data["listing"])
        
        listing_images = request.data.getlist("image")
        listing_images_bulk_create_list = []
        for image in listing_images:
            listing_images_bulk_create_list.append(ListingImage(listing=listing, image=image))

        ListingImage.objects.bulk_create(listing_images_bulk_create_list)
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)