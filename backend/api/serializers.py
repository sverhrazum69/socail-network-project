from rest_framework import serializers
from .models import User 

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','telephoneNumber','homeCountry','address','avatar','desctiption']