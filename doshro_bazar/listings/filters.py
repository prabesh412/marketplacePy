from django_filters import rest_framework as filters_new
from doshro_bazar.listings.models import Listings

class ListingsFilter(filters_new.FilterSet):
    order = filters_new.OrderingFilter(
        fields=(
            ('created_at', 'created_at'),
            ('updated_at', 'updated_at'),
            ('price', 'price'),
            ('views__views', 'views'),
        )
    )

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
            'category__parent': ['exact'],
            'listing_condition': ['exact'],
            'is_sfw': ['exact'],
            'is_scraped': ['exact'],
            'is_featured': ['exact'],
        }

 

