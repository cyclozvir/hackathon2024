from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from backend.user.managers import CustomUserManager


# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):
    objects = CustomUserManager()
    CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Prefer not to say'),
    ]

    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    role = models.CharField(max_length=100)

    class Meta:
        permissions = [('view', 'Can view specific page'), ('edit', 'Can edit content'), ('comment', 'Can comment'),
                       ('create_new', 'Can create new user')]
