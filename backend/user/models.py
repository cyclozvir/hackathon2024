from datetime import datetime

from django.utils import timezone
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from .managers import CustomUserManager


class Location(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return f"{self.latitude}, {self.longitude}"


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = None
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    role = models.CharField(max_length=50, choices=(("seeker", "seeker"),
                                                    ("reporter", "reporter"),
                                                    ("manager", "manager")),
                            default="seeker")

    REQUIRED_FIELDS = ['first_name', 'last_name', "role"]

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)

    class Meta:
        permissions = [('view', 'Can view specific page'), ('edit', 'Can edit content'), ('comment', 'Can comment'),
                       ('create_new', 'Can create new user')]





class Seeker(CustomUser):
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=100, choices=(('male', 'male'),
                                                       ('female', 'female'),
                                                       ('not specified', 'not specified')), default='not specified')
    occupation = models.CharField(max_length=100)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.role = "reporter"

    def __str__(self):
        return f"Seeker: {self.email}"

class SeekerLocation(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    seeker = models.ForeignKey(Seeker, on_delete=models.CASCADE, related_name='locations')
    def __str__(self):
        return f"{self.latitude}, {self.longitude}"


class Reporter(CustomUser):
    occupation = models.CharField(max_length=100)
    contact_information = models.CharField(max_length=255)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.role = "seeker"

    def __str__(self):
        return f"Reporter: {self.email}"


class MissingPerson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=100, choices=(('male', 'male'),
                                                       ('female', 'female'),
                                                       ('not specified', 'not specified')), default='not specified')
    description = models.TextField()
    last_seen_location = models.OneToOneField(Location, on_delete=models.CASCADE)
    last_seen_date = models.DateField(default=datetime.now)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True, null=True)
    contact_information = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.first_name


