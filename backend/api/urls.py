from django.urls import path, include
from .views import UsersAPI ,updateUserApi, manageFriendRequests


urlpatterns = [
    path('users/',UsersAPI.as_view()),   
    path('users/<str:username>/',updateUserApi.as_view()),
    path('friendRequests/',manageFriendRequests.as_view()),  
    path('friendRequests/<int:pk>/',manageFriendRequests.as_view()),
] 
