from django.db import models
from django.db.models import constraints
from django.contrib.auth import get_user_model
from django.db.models.signals import m2m_changed
from django.core.exceptions import ValidationError

User = get_user_model()

def participants_changed(sender,**kwargs):
    if kwargs['instance'].participants.count() > 2:
        raise ValidationError("Cant add more then 2 members to a chatt")


class Messages(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='author')
    content = models.CharField(max_length=30)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'MESSAGE:{self.content} AUTHOR:{self.author.username}'


class ChatRoom(models.Model):
    code = models.BigIntegerField(unique=True)
    participants = models.ManyToManyField(User,related_name="participants")
    messages = models.ManyToManyField(Messages,related_name="messages",blank = True)
    constraints.UniqueConstraint(fields=['user1','user2'],name='unique_rooms')

    def __str__(self):
        return str(self.code)

    def get_last_5_messages_(self,user):
        return self.messages.objects.order_by('-date').all()[:10]

m2m_changed.connect(participants_changed,sender=ChatRoom.participants.through)