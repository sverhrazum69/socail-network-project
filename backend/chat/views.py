from django.shortcuts import render
from .serializers import ChatSerializer
from rest_framework import generics, viewsets
from rest_framework.response import Response
from django.http import Http404
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin, CreateModelMixin, DestroyModelMixin
from .models import ChatRoom
from django_filters.rest_framework import DjangoFilterBackend

def index(request):
    return render(request, 'chat/index.html')

def room(request,room_name):
    return render(request,'chat/room.html',{
        'room_name':room_name
    })

class chats(generics.GenericAPIView,ListModelMixin):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['participants__username']

    def get(self,request):
        return self.list(request)