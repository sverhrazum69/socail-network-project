from django.db import models
from django.db.models import constraints, Q
from django.contrib.auth import get_user_model
from django.db.models.signals import m2m_changed
from django.core.exceptions import ValidationError
from random import randint
import requests

User = get_user_model()


def friendAdded(sender,**kwargs):
    print(kwargs['action'])
    if kwargs['action'] == 'pre_add':
        print(kwargs)
        url = 'http://localhost:8000/chat/rooms/'
        data = {
            'code':randint(1,10000),
            'participants':[kwargs['instance'].id,kwargs['pk_set']]
        }
        requests.post(url=url,data=data)
    # elif kwargs['action'] == 'pre_remove':
    #     chatObjects = ChatRoom.objects.all()
    #     for obj in chatObjects:
    #         print(type(kwargs['pk_set']))
    #         print(obj.participants.filter(Q(id=3)))
    #         print(kwargs['instance'].id)
            
    #         chatObj = obj.participants.filter(Q(id = kwargs['instance'].id) & Q(id = kwargs['pk_set'].pop()))
    #         print(chatObj)
    #         if chatObj:
    #             chatObj.delete()
    #             break
def participants_changed(sender,**kwargs):
    if kwargs['instance'].participants.count() > 2:
        raise ValidationError("Cant add more then 2 members to a chatt")


class Messages(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='author')
    content = models.CharField(max_length=30)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'MESSAGE:{self.content} AUTHOR:{self.author.username}'
    def get_last_10_messages():
        return Messages.objects.order_by('-date').all()[:10]


class ChatRoom(models.Model):
    code = models.BigIntegerField(unique=True)
    participants = models.ManyToManyField(User,related_name="participants")
    messages = models.ManyToManyField(Messages,related_name="messages",blank = True)
    constraints.UniqueConstraint(fields=['user1','user2'],name='unique_rooms')
    
    def __str__(self):
        return str(self.code)

    def get_last_10_messages(self):
        return self.messages.order_by('-date').all()[:10]

m2m_changed.connect(participants_changed,sender=ChatRoom.participants.through)
m2m_changed.connect(friendAdded,sender=User.friends.through)