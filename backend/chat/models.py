from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Messages(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='author')
    content = models.CharField(max_length=30)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.author.username

    def get_last_10_messages(self):
        return Messages.objects.order_by('-date').all()[10]