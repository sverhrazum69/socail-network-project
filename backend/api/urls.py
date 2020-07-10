from django.urls import path, include
from .views import UsersAPI ,UserApi


urlpatterns = [
    path('users/',UsersAPI.as_view()),   
    path('users/<str:username>/',UserApi.as_view()),
]
