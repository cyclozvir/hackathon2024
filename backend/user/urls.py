from django.urls import path
from .views import *

urlpatterns = [
    # path("user/login", ),
    path("api/v1/user/register/", UserRegistrationView.as_view(), name='user-registration'),
    path("api/v1/user/register/seeker/", SeekerRegistrationView.as_view(), name='user-registration'),
    path("api/v1/user/register/reporter/", ReporterRegistrationView.as_view(), name='user-registration'),
    path("api/v1/user/update/", UserUpdateView.as_view()),
    path("api/v1/user/", UserView.as_view()),
    path("api/v1/user/reset_password/", PasswordReset.as_view(), name="request-password-reset"),
    path("password-reset/<str:encoded_pk>/<str:token>/", ResetPasswordAPI.as_view(), name="reset-password"),


]