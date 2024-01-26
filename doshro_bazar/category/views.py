from rest_framework import viewsets, status
from doshro_bazar.category.models import Category
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django_filters import rest_framework as filters_new
from doshro_bazar.category.serializers import CategorySerializer
from rest_framework.mixins import ListModelMixin
from rest_framework_extensions.cache.decorators import (
    cache_response
)

@extend_schema_view(
    list=extend_schema(description="Return a list of all the existing categories."),
)
class CategoryViewSet(ListModelMixin, GenericViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = (filters_new.DjangoFilterBackend, )
    pagination_class = None


    @cache_response(timeout=60 * 30)
    def list(self, request, *args, **kwargs):
       return super().list(self, request, *args, **kwargs)