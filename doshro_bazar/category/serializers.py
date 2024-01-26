from rest_framework import serializers
from doshro_bazar.category.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name', 'slug', 'parent', 'main_category_image']




      
        

   