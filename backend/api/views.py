from django.shortcuts import render
from django.http import HttpResponse
from .serializers import userSerializer, friendRequestSerializer
from rest_framework import generics, viewsets
from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin, CreateModelMixin, DestroyModelMixin
from .models import User, Friend_request
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




class manageFriendRequests(generics.GenericAPIView,
                            ListModelMixin,
                            RetrieveModelMixin,
                            CreateModelMixin,
                            DestroyModelMixin,
                            UpdateModelMixin):
    queryset = Friend_request.objects.all()
    serializer_class = friendRequestSerializer
    def get(self,request,pk=None):
        if pk:
            return self.retrieve(request)
        else:
            return self.list(request)
    def post(self,request):
        return self.create(request)
    def put(self,request,pk=None):
        if pk:
            return self.update(request)
    def delete(self,request,pk=None):
        if pk:
            friendRequest = Friend_request.objects.get(id=pk)
            if friendRequest.accepted:
                friendRequest.from_user.friends.add(friendRequest.to_user)
                friendRequest.save()
            return self.destroy(request)


    

    


    