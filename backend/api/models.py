from django.db import models
from django.db.models import Q
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class User(AbstractUser):
    phone_regex = RegexValidator(regex=r'^\+?3?8?(0[5-9][0-9]\d{7})$', message="Phone number must be entered in the valid format (for example: '+380999999999')")
    telephoneNumber = models.CharField(validators = [phone_regex],max_length = 14,null=True,blank=True)
    homeCountry = models.CharField(max_length = 50,null=True,blank=True)
    address = models.CharField(max_length = 100,null=True,blank=True)
    avatar = models.ImageField(null=True,blank=True,upload_to='')
    desctiption = models.TextField(null=True,blank=True)
    friends = models.ManyToManyField('self',symmetrical=True)

class Friend_request(models.Model):
    from_user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="from_user")
    to_user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="to_user")
    accepted = models.BooleanField(default=False)
    def __str__(self):
        return f"From {self.from_user.username} to {self.to_user.username}"