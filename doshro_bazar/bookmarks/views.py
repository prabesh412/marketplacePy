from rest_framework import viewsets, status
from doshro_bazar.bookmarks.models import Bookmark
from drf_spectacular.utils import extend_schema, extend_schema_view
from django_filters import rest_framework as filters_new
from doshro_bazar.bookmarks.serializers import BookmarkSerializer, BookmarkInputSerializer, BookmarkProfileSerializer
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin, CreateModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action




class BookmarkViewSet(GenericViewSet, CreateModelMixin, DestroyModelMixin):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    filter_backends = (filters_new.DjangoFilterBackend, )
    pagination_class = None

    def get_serializer_class(self):
        if self.action == "create":
            return BookmarkInputSerializer
        
        if self.action == "profile":
            return BookmarkProfileSerializer
        return BookmarkSerializer

    
    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.user != request.user:
            return Response({"message": "You are not authorized to delete this bookmark."}, status=status.HTTP_401_UNAUTHORIZED)

        self.perform_destroy(obj)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not request.user: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=False)
    def me(self, request, *args, **kwargs):
        queryset = Bookmark.objects.filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False)
    def profile(self, request, *args, **kwargs):
        queryset = Bookmark.objects.filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
