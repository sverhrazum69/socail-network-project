from rest_framework import serializers
from .models import User 
import base64
from django.core.files.base import ContentFile

def decode64(b64image):
    print(b64image.split(';base64,'))
    format, imgstr = b64image.split(';base64,')
    ext = format.split('/')[-1]
    return ContentFile(base64.b64decode(imgstr),name='temp.' + ext)


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email','telephoneNumber','homeCountry','address','avatar','desctiption','friends']
        #extra_kwargs: {'avatar':{'write_only':True}}
   # def update(self,instance,validated_data):
    #    instance.avatar = decode64(validated_data['avatar'])
     #   print(instance.avatar)
     #   instance = super(userSerializer,self).update(instance,validated_data)
        
     #   return instance
