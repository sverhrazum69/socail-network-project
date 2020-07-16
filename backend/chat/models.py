from django.db import models
from django.db.models import constraints
from django.contrib.auth import get_user_model

User = get_user_model()




class Messages(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='author')
    content = models.CharField(max_length=30)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'MESSAGE:{self.content} AUTHOR:{self.author.username}'


class ChatRoom(models.Model):
    code = models.BigIntegerField(unique=True)
    # user1 = models.ForeignKey(User,on_delete=models.CASCADE,related_name='user1')
    # user2 = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user2")
    participants = models.ManyToManyField(User,related_name="participants")
    messages = models.ManyToManyField(Messages,related_name="messages",blank = True)
    constraints.UniqueConstraint(fields=['user1','user2'],name='unique_rooms')

    def __str__(self):
        return str(self.code)

    def get_last_5_messages_(self,user):
        return self.messages.objects.filter(author = user).order_by('-date').all()[:5]
