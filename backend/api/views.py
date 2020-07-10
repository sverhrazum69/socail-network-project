from django.shortcuts import render
from django.http import HttpResponse
from .serializers import userSerializer
from rest_framework import generics
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin
from .models import User
from django_filters.rest_framework import DjangoFilterBackend

class UsersAPI(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer
# Create your views here.

class UserApi(generics.GenericAPIView,
                ListModelMixin,
                UpdateModelMixin,
                RetrieveModelMixin):
    serializer_class = userSerializer
    lookup_field = 'username'
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username']
    queryset = User.objects.all()

    def get(self,request,username):    
        return self.retrieve(request,username)
    def put(self,request,username):
        return self.update(request,username)
        
    

    