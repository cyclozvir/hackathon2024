from django.core.mail import send_mail
from django.conf import settings


def send_email(subject, message, recipient_list):
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list)


def send_email_with_password(user, password):
    subject = 'EPoshuk Registration'
    message = f'''
        Dear User,

        Welcome to Eposhuk Platform! Your account has been successfully created.

        Below are your login credentials:

        Email: {user.email}
        Password: {password}

        Please keep your password secure and do not share it with anyone.

        Best regards,
        The Eposhuk Team
        '''

    recipient_list = [user.email]
    print("hello")
    send_email(subject, message, recipient_list)
    print("done")