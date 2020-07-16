from django.shortcuts import render
from .serializers import GetChatSerializer, PostChatSerializer
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

class chats(generics.GenericAPIView,ListModelMixin,RetrieveModelMixin,CreateModelMixin):
    queryset = ChatRoom.objects.all()
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GetChatSerializer
        else:
            return PostChatSerializer

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['participants__username']

    def get(self,request,pk=None):
        if pk:
            return self.retrieve(request,pk)
        return self.list(request)
    
    def post(self,request):
        return self.create(request)