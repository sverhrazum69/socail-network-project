from rest_framework import serializers
from .models import User, Friend_request
import base64
from django.core.files.base import ContentFile


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','telephoneNumber','homeCountry','address','avatar','desctiption','friends']

class friendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend_request
        fields  = '__all__'
