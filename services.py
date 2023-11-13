# Service 1

service_1_name = 'Фотосъемка во время записи'
service_1_description = 'С последующей обработкой фотографий.'
service_1_price = '8900'
service_1_img = 'test.png'

service_1 = {
    'name': service_1_name,
    'description': service_1_description,
    'price': service_1_price,
    'img': service_1_img,
}

# Service 2

service_2_name = 'Видеосъемка во время записи'
service_2_description = 'С последующим монтажом видеоклипа на песню.'
service_2_price = '15900'
service_2_img = 'test.png'

service_2 = {
    'name': service_2_name,
    'description': service_2_description,
    'price': service_2_price,
    'img': service_2_img,
}

# Service 3

service_3_name = 'Доплата за участника в съемке видеоклипа'
service_3_description = 'Для неучаствующих в записи.'
service_3_price = '3000'
service_3_img = 'test.png'

service_3 = {
    'name': service_3_name,
    'description': service_3_description,
    'price': service_3_price,
    'img': service_3_img,
}

# Service 4

service_4_name = 'Прическа и макияж для фото/видео съемки'
service_4_description = 'За 1 персону. С выездом на студию.'
service_4_price = '10000'
service_4_img = 'test.png'

service_4 = {
    'name': service_4_name,
    'description': service_4_description,
    'price': service_4_price,
    'img': service_4_img,
}

# Service 5

service_5_name = 'Запись живого инструмента самостоятельно'
service_5_description = 'За 1 час для 1 инструмента (с монтажом)'
service_5_price = '6500'
service_5_img = 'test.png'

service_5 = {
    'name': service_5_name,
    'description': service_5_description,
    'price': service_5_price,
    'img': service_5_img,
}

all_services = {
    '1': service_1,
    '2': service_2,
    '3': service_3,
    '4': service_4,
    '5': service_5,
}


def get_services():
    return all_services


def get_service(service_id):
    return all_services[str(service_id)]
