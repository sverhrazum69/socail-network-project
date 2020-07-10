from django.urls import path, include
from .views import UsersAPI ,updateUserApi


urlpatterns = [
    path('users/',UsersAPI.as_view()),   
    path('users/<str:username>/',updateUserApi.as_view()),

]
