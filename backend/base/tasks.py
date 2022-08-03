from celery import shared_task
from time import sleep
from django.core.mail import send_mail


@shared_task
def booking_mail_sender(email, restaurant, date, table_quantity):
    send_mail(
        f"Table booking at {restaurant}",
        f"You booked a {table_quantity} table in {restaurant} on {date}",
        "botfooddelivery@gmail.com",
        [email],
    )
    return None
