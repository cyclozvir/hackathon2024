from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django_filters import filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, generics, response
from rest_framework.filters import SearchFilter
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from utils import Email
from .models import *
from .serializers import *
# Create your views here.
from user import serializers


class MissingPersonListCreateAPIView(generics.ListCreateAPIView, ):
    permission_classes = [AllowAny]
    queryset = MissingPerson.objects.all()
    serializer_class = MissingPersonSerializer
    filter_backends = [SearchFilter]
    search_fields = ['first_name', 'last_name']


class MissingPersonRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    queryset = MissingPerson.objects.all()
    serializer_class = MissingPersonSerializer
