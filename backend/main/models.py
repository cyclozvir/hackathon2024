from datetime import datetime

from django.db import models



class MissingPerson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=100, choices=(('male', 'male'),
                                                       ('female', 'female'),
                                                       ('not specified', 'not specified')), default='not specified')
    description = models.TextField()
    last_seen_date = models.DateField(default=datetime.now)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d', blank=True, null=True)
    contact_information = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.first_name


class MissingPersonLocation(models.Model):
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    missing_person = models.OneToOneField(MissingPerson, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.latitude}, {self.longitude}"
