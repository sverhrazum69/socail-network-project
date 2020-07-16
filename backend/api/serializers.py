from rest_framework import serializers
from .models import User, Friend_request
import base64
from django.core.files.base import ContentFile



class userSerializerForFriendReq(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','avatar','friends']


class GETuserSerializer(serializers.ModelSerializer):
    friends = userSerializerForFriendReq(many=True)
    class Meta:
        model = User
        fields = ['id','username','email','telephoneNumber','homeCountry','address','avatar','desctiption','friends']
                                                                                                                    

class POSTuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','telephoneNumber','homeCountry','address','avatar','desctiption','friends']

class friendRequestReadSerializer(serializers.ModelSerializer):
    from_user = userSerializerForFriendReq()
    to_user = userSerializerForFriendReq()
    class Meta:
        model = Friend_request
        fields  = '__all__'

class friendRequestWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend_request
        fields  = '__all__'
    
