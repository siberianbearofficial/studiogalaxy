from decorators import async_dec
from flask import render_template
from config import ADMINS
from flask_mail import Message
# from app import mail


@async_dec
def send_email_async(msg):
    from app import mail
    mail.send(msg)


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    send_email_async(msg)


def send_new_order_notification(cart_order):
    send_email(
        subject=f'Новый заказ от {cart_order["time"]}',
        sender=ADMINS[0],
        recipients=ADMINS,
        text_body=render_template('new_order_email.txt', cart_order=cart_order),
        html_body=render_template('new_order_email.html', cart_order=cart_order),
    )
