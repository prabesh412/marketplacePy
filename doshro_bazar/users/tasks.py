from celery import shared_task
from django.contrib.auth import get_user_model

from config import celery_app
from doshro_bazar.utils.SparrowClient import MessageHandler

User = get_user_model()


@celery_app.task()
def get_users_count():
    """A pointless Celery task to demonstrate usage."""
    return User.objects.count()

@shared_task
def send_otp(phone_number,otp):
    message_handler=MessageHandler(phone_number,otp)
    return message_handler.send_otp_via_message()
