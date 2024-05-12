from django.urls import path
from .views import *

urlpatterns = [
    path('missing-persons/', MissingPersonListCreateAPIView.as_view(), name='missing_person_list_create'),
    path('missing-persons/<int:pk>/', MissingPersonRetrieveUpdateDestroyAPIView.as_view(), name='missing_person_retrieve_update_destroy'),
]