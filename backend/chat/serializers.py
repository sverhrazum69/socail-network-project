from rest_framework import serializers
from api.serializers import userSerializerForFriendReq
from .models import ChatRoom

class ChatSerializer(serializers.ModelSerializer):
    participants = userSerializerForFriendReq(many=True)
    class Meta:
        model = ChatRoom
        fields = '__all__'