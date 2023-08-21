from django_filters import rest_framework as filters_new
from doshro_bazar.listings.models import Listings

class ListingsFilter(filters_new.FilterSet):
    class Meta:
        model = Listings
        fields = {
            'title': ['icontains'],
            'price': ['exact', 'lt', 'gt'],
            'status': ['exact'],
            'sale_status': ['exact'],
            'category': ['exact'],
            'user': ['exact'],
            'created_at': ['exact', 'lt', 'gt'],
            'updated_at': ['exact', 'lt', 'gt'],
        }


