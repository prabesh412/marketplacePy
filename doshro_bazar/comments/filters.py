from django_filters import rest_framework as filters_new
from doshro_bazar.comments.models import Comments

class CommentsFilter(filters_new.FilterSet):
    order = filters_new.OrderingFilter(
        fields=(
            ('created_at', 'created_at'),
            ('updated_at', 'updated_at'),
        )
    )

    class Meta:
        model = Comments
        fields = {
            'user': ['exact'],
            'listing': ['exact'],
            'created_at': ['exact', 'lt', 'gt'],
            'updated_at': ['exact', 'lt', 'gt'],
        }