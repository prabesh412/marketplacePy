from rest_framework import serializers
from doshro_bazar.comments.models import Comments
from doshro_bazar.users.models import User
from doshro_bazar.users.api.serializers import UserSerializer,CommentUserSerializer
from django.core.serializers import serialize
import json

class CommentsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comments
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]


def get_replies(parent_replies, replies=None):
    for reply in parent_replies:
        if reply["id"] == replies["parent"]:
            reply["replies"] = reply.get("replies", [])
            reply["replies"].append(replies)
            break
        else:
            if reply.get("replies"):
                get_replies(reply["replies"], replies)
    return parent_replies

    

class CommentsInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at", "replies"]

    def create(self, validated_data):
        if validated_data.get("parent"):
            reply_obj = Comments.objects.create(**validated_data)
            validated_data["listing"] = validated_data.get("listing").slug
            validated_data["user"] = self.context["request"].user.id
            validated_data["parent"] = validated_data.get("parent").id
            validated_data["top_parent"] = validated_data.get("top_parent").id

            user = User.objects.get(id=validated_data["user"])
           
            if (validated_data["parent"] == validated_data["top_parent"]):
                main_parent_comment = Comments.objects.get(id=validated_data["parent"])
            else :
                main_parent_comment = Comments.objects.get(id=validated_data["top_parent"])
            user_serializer = CommentUserSerializer(user)

            user_data = user_serializer.data
            validated_data["user"] = user_data
            validated_data["id"] = reply_obj.id
            replies = main_parent_comment.replies

            if replies:
                if validated_data["parent"] == main_parent_comment.id:
                    replies.append(validated_data)
                else:
                    parent_reply_json = get_replies(replies, validated_data)
                    replies = parent_reply_json
            
                
            if not replies and not main_parent_comment.parent:
                replies = [validated_data]
                
            main_parent_comment.replies = replies
            main_parent_comment.save()
            return main_parent_comment        

        return super().create(validated_data)

    