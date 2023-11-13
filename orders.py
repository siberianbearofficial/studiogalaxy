from datetime import datetime
from flask import render_template
from services import get_service
from certificates import get_certificate_card


class Order:
    time = None
    cart_buyer_name_input = None
    cart_recipient_name_input = None
    cart_email_input = None
    cart_tel_input = None
    cart_city_input = None
    cart_delivery_method_radio_button = None
    cart_delivery_street = None
    cart_delivery_house = None
    cart_delivery_apartment = None
    cart_delivery_promo = None
    cart_delivery_comment = None
    cart_dictionary = []
    cart_payment_radio_button = None
    total = 0

    def __init__(self):
        self.time = datetime.now().strftime("%H:%M:%S %d.%m.%Y")

    def to_dict(self):
        return {
            'time': self.time,
            'cart_buyer_name_input': self.cart_buyer_name_input,
            'cart_recipient_name_input': self.cart_recipient_name_input,
            'cart_email_input': self.cart_email_input,
            'cart_tel_input': self.cart_tel_input,
            'cart_city_input': self.cart_city_input,
            'cart_delivery_method_radio_button': self.cart_delivery_method_radio_button,
            'cart_delivery_street': self.cart_delivery_street,
            'cart_delivery_house': self.cart_delivery_house,
            'cart_delivery_apartment': self.cart_delivery_apartment,
            'cart_delivery_promo': self.cart_delivery_promo,
            'cart_delivery_comment': self.cart_delivery_comment,
            'cart_payment_radio_button': self.cart_payment_radio_button,
            'cart_dictionary': self.cart_dictionary,
            'total': self.total,
        }

    def from_dict(self, order_dict):
        self.cart_buyer_name_input = order_dict.get('cart_buyer_name_input', None)
        self.cart_recipient_name_input = order_dict.get('cart_recipient_name_input', None)
        self.cart_email_input = order_dict.get('cart_email_input', None)
        self.cart_tel_input = order_dict.get('cart_tel_input', None)
        self.cart_city_input = order_dict.get('cart_city_input', None)
        self.cart_delivery_method_radio_button = \
            delivery_method_radio_button[int(order_dict.get('cart_delivery_method_radio_button', '3') if order_dict.get(
                'cart_delivery_method_radio_button', '3') is not None else '3')]
        self.cart_delivery_street = order_dict.get('cart_delivery_street', None)
        self.cart_delivery_house = order_dict.get('cart_delivery_house', None)
        self.cart_delivery_apartment = order_dict.get('cart_delivery_apartment', None)
        self.cart_delivery_promo = order_dict.get('cart_delivery_promo', None)
        self.cart_delivery_comment = order_dict.get('cart_delivery_comment', None)
        self.cart_payment_radio_button = \
            payment_method_radio_button[
                int(order_dict.get('cart_payment_radio_button', '1') if order_dict.get('cart_payment_radio_button',
                                                                                       '1') is not None else '1')]
        order_dict_cart_dictionary = order_dict.get('cart_dictionary', None)
        if order_dict_cart_dictionary is not None:
            for el in order_dict_cart_dictionary:
                if int(el[0]) == 0:
                    el = get_certificate_card(el[1])
                    el_name = el['heading']
                else:
                    el = get_service(el[1])
                    el_name = el['name']
                self.total += float(el['price'].replace(' ', ''))
                self.cart_dictionary.append({'name': el_name, 'price': el['price']})

    def to_text_template(self):
        return render_template("new_order_email.txt", cart_order=self.to_dict())


delivery_method_radio_button = {
    0: 'Срочная доставка*',
    1: 'Стандартная доставка (в пределах МКАД)',
    2: 'Доставка за МКАД (5км)',
    3: 'Получить в электронном виде',
    4: 'Бесплатно (Сумма заказа более 30 000 руб.)*',
    5: 'Самовывоз*',
}

payment_method_radio_button = {
    0: 'Наличными во время записи',
    1: 'Безналичная оплата',
}
