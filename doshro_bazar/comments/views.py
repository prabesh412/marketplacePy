from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from doshro_bazar.comments.models import Comments
from doshro_bazar.comments.serializers import CommentsSerializer, CommentsInputSerializer


# Create your views here.
class CommentsViewset(viewsets.ModelViewSet):
    queryset = Comments.objects.all().select_related("user", "listing")
    serializer_class = CommentsSerializer

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return CommentsInputSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        queryset = self.queryset.filter(parent__isnull=True, top_parent__isnull=True)
        return queryset

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "You are not authorized to create a comment."}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def destroy(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "You are not authorized to delete a comment."}, status=status.HTTP_401_UNAUTHORIZED)
        instance = self.get_object()
        if instance.user != request.user:
            return Response({"message": "You are not authorized to delete this comment."}, status=status.HTTP_401_UNAUTHORIZED)
        return super().destroy(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "You are not authorized to update a comment."}, status=status.HTTP_401_UNAUTHORIZED)
        instance = self.get_object()
        if instance.user != request.user:
            return Response({"message": "You are not authorized to update this comment."}, status=status.HTTP_401_UNAUTHORIZED)
        return super().update(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"message": "You are not authorized to update a comment."}, status=status.HTTP_401_UNAUTHORIZED)
        instance = self.get_object()
        if instance.user != request.user:
            return Response({"message": "You are not authorized to update this comment."}, status=status.HTTP_401_UNAUTHORIZED)
        return super().partial_update(request, *args, **kwargs)
    


