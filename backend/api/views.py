from django.shortcuts import render
from django.http import HttpResponse
from .serializers import userSerializer
from rest_framework import generics
from .models import User

class UserAPI(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer
# Create your views here.
