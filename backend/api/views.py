from django.shortcuts import render
from django.http import HttpResponse
from .serializers import userSerializer
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin
from .models import User
from django_filters.rest_framework import DjangoFilterBackend

class UsersAPI(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username','id']




class updateUserApi(generics.RetrieveUpdateAPIView):
    serializer_class = userSerializer
    lookup_field = 'username'
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username']
    queryset = User.objects.all()



    

    


    