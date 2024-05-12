from rest_framework import status, generics, response
from rest_framework.filters import SearchFilter
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import *


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
