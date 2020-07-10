from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class User(AbstractUser):
    phone_regex = RegexValidator(regex=r'^\+?3?8?(0[5-9][0-9]\d{7})$', message="Phone number must be entered in the valid format (for example: '+3809999999999')")
    telephoneNumber = models.CharField(validators = [phone_regex],max_length = 15,null=True,blank=True)
    homeCountry = models.CharField(max_length = 50,null=True,blank=True)
    address = models.CharField(max_length = 100,null=True,blank=True)
    avatar = models.ImageField(null=True,blank=True,upload_to='media')
    desctiption = models.TextField(null=True,blank=True)
