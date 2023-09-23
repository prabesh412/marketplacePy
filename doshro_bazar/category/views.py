from rest_framework import viewsets, status
from doshro_bazar.category.models import Category
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django_filters import rest_framework as filters_new
from doshro_bazar.category.serializers import CategorySerializer
from rest_framework.mixins import ListModelMixin


@extend_schema_view(
    list=extend_schema(description="Return a list of all the existing categories."),
)
class CategoryViewSet(ListModelMixin, GenericViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = (filters_new.DjangoFilterBackend, )
    pagination_class = None
