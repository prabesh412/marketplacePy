from rest_framework import serializers
from doshro_bazar.category.models import Category

class CategorySerializer(serializers.ModelSerializer):
    sub_catgory = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['name', 'slug', 'parent', 'sub_catgory']

    def get_sub_catgory(self, category):
        children = category.children.all()
        print(children)
        serializer = CategorySerializer(children, many=True)
        return serializer.data


   