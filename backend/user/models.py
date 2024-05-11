from django.utils import timezone
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from .managers import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = None
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['first_name', 'last_name']
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # password = models.CharField()
    objects = CustomUserManager()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)

    class Meta:
        permissions = [('view', 'Can view specific page'), ('edit', 'Can edit content'), ('comment', 'Can comment'),
                       ('create_new', 'Can create new user')]