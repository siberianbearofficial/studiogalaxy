import json

from flask import Flask, render_template, redirect, request
from flask_cors import CORS, cross_origin

from certificates import get_certificate_cards, get_certificate_card
from reviews import get_reviews
from services import get_services, get_service
from questions import get_questions
from flask_mail import Mail
from telegram_handler import send_new_order_notification
from config import *
from orders import Order
from contacts import get_footer_links, get_tel_number

application = Flask(__name__)
application.config['MAIL_SERVER'] = MAIL_SERVER
application.config['MAIL_PORT'] = MAIL_PORT
# application.config['MAIL_USE_TLS'] = MAIL_USE_TLS
application.config['MAIL_USE_SSL'] = MAIL_USE_SSL
application.config['MAIL_USERNAME'] = MAIL_USERNAME
application.config['MAIL_PASSWORD'] = MAIL_PASSWORD
application.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(application)
mail = Mail(application)


@application.route('/')
def index_page():
    return render_template('index.html',
                           certificate_cards=get_certificate_cards(),
                           # vip_certificate_cards=get_certificate_cards(),
                           reviews=get_reviews(),
                           services=get_services(),
                           questions=get_questions(),
                           tel_number=get_tel_number(),
                           footer_links=get_footer_links()
                           )


@application.route('/place_an_order', methods=['POST'])
def place_an_order_page():
    cart_buyer_name_input = request.form.get('cart_buyer_name_input')
    cart_recipient_name_input = request.form.get('cart_recipient_name_input')
    cart_email_input = request.form.get('cart_email_input')
    cart_tel_input = request.form.get('cart_tel_input')
    cart_city_input = request.form.get('cart_city_input')
    cart_delivery_method_radio_button = request.form.get('cart_delivery_method_radio_button')
    # cart_delivery_street = request.form['cart_delivery_street']
    # cart_delivery_house = request.form['cart_delivery_house']
    # cart_delivery_apartment = request.form['cart_delivery_apartment']
    cart_delivery_promo = request.form.get('cart_delivery_promo')
    cart_delivery_comment = request.form.get('cart_delivery_comment')
    cart_payment_radio_button = request.form.get('cart_payment_radio_button')

    cart_dictionary = json.loads(request.form.get('cart_dict'))

    cart_order = Order()
    cart_order.from_dict(
        {
            'cart_buyer_name_input': cart_buyer_name_input,
            'cart_recipient_name_input': cart_recipient_name_input,
            'cart_email_input': cart_email_input,
            'cart_tel_input': cart_tel_input,
            'cart_city_input': cart_city_input,
            'cart_delivery_method_radio_button': cart_delivery_method_radio_button,
            # 'cart_delivery_street': cart_delivery_street,
            # 'cart_delivery_house': cart_delivery_house,
            # 'cart_delivery_apartment': cart_delivery_apartment,
            'cart_delivery_promo': cart_delivery_promo,
            'cart_delivery_comment': cart_delivery_comment,
            'cart_payment_radio_button': cart_payment_radio_button,
            'cart_dictionary': cart_dictionary,
        }
    )

    send_new_order_notification(cart_order)

    return redirect('/')


@application.route('/get_photo_carousel_images')
def get_photo_carousel_images_page():
    return json.dumps([
        'photo_carousel/slide1.jpg',
        'photo_carousel/slide2.jpg',
        'photo_carousel/slide3.jpg',
        'photo_carousel/slide4.jpg',
        'photo_carousel/slide5.jpg',
    ])


@application.route('/audio_examples')
def get_audio_examples_page():
    return json.dumps([
        'Мужской эстрадный вокал.mp3',
        'Женский эстрадный вокал.mp3',
        'Мужской романс.mp3',
        'Женский романс.mp3',
        'Академический женский вокал.mp3',
        'Ансамбль.mp3',
        'Детский вокал.mp3',
        'Хип-хоп.mp3',
    ])


@application.route('/get_certificate_card/<certificate_id>')
def get_certificate_card_page(certificate_id):
    return json.dumps(get_certificate_card(certificate_id))


@application.route('/get_service_card/<service_id>')
def get_service_page(service_id):
    return json.dumps(get_service(service_id))


if __name__ == '__main__':
    application.run()
