from requests import get
from decorators import async_dec
from config import TOKEN, CHAT_IDs


@async_dec
def send_new_order_notification_async(url):
    get(url)


def send_new_order_notification(cart_order):
    for chat_id in CHAT_IDs:
        send_new_order_notification_async(prepare_url(cart_order, chat_id))
        # get(prepare_url(cart_order, chat_id))


def prepare_url(cart_order, chat_id):
    base_url = 'https://api.telegram.org/bot{}/sendMessage?chat_id={}&text={}'
    msg = cart_order.to_text_template()
    return base_url.format(TOKEN, chat_id, msg)
