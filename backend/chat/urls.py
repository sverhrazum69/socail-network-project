from django.urls import path

from .views import index,room,chats

urlpatterns = [
    path('', index, name='index'),
  #  path('<str:room_name>/',room)
    path('rooms/',chats.as_view()),
    path('rooms/<str:pk>',chats.as_view())
]