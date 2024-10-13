# Certificate 1

certificate_1_heading = 'Соло "Звезда КАРАОКЕ"'
certificate_1_img = 'karaoke_star.jpg'
certificate_1_price = '9 900'
certificate_1_old_price = '12 000'
certificate_1_list = [
    'Запись песни на готовый минус (студия предоставляет минус)',
    'Аренда студии',
    'Тюнинг и монтаж вокала',
    'Сведение и мастеринг',
    'Время обработки записанной песни 3-4 рабочих дня.',
    '«Соло» вы получаете по e-mail',
]

certificate_1 = {
    'heading': certificate_1_heading,
    'img': certificate_1_img,
    'price': certificate_1_price,
    'old_price': certificate_1_old_price,
    'list': certificate_1_list,
}


# Certificate 2

certificate_2_heading = 'Дуэт "Две звезды"'
certificate_2_img = 'two_stars.jpg'
certificate_2_price = '14 900'
certificate_2_old_price = '18 000'
certificate_2_list = [
    'Запись 2-х человек на готовый минус (студия предоставляет минус)',
    'Аренда студии',
    'Тюнинг и монтаж вокала',
    'Сведение и мастеринг',
    'Время обработки записанной песни 4-5 рабочих дня.',
    '«Дуэт» вы получаете по e-mail',
]

certificate_2 = {
    'heading': certificate_2_heading,
    'img': certificate_2_img,
    'price': certificate_2_price,
    'old_price': certificate_2_old_price,
    'list': certificate_2_list,
}


# Certificate 3

certificate_3_heading = 'Сайфер "Созвездие"'
certificate_3_img = 'stars.jpg'
certificate_3_price = '19 900'
certificate_3_old_price = '24 000'
certificate_3_list = [
    'Запись 3-х (и более участников) на готовый минус (студия предоставляет минус)',
    'Стоимость рассчитывается из количества участников: за каждого дополнительного + 5 000 рублей',
    'Аренда студии',
    'Тюнинг и монтаж вокала',
    'Сведение и мастеринг',
    'Время обработки записанной песни 4-5 рабочих дня.',
    '«Сайфер» вы получаете по e-mail',
]

certificate_3 = {
    'heading': certificate_3_heading,
    'img': certificate_3_img,
    'price': certificate_3_price,
    'old_price': certificate_3_old_price,
    'list': certificate_3_list,
}


# Certificate 4

certificate_4_heading = 'Сертификат "Альбом"'
certificate_4_img = 'album.jpg'
certificate_4_price = '89 900'
certificate_4_old_price = '108 000'
certificate_4_list = [
    'Запись десяти песен на готовый минус (студия предоставляет минусовки)',
    'Аренда студии',
    'Тюнинг и монтаж вокала',
    'Сведение и мастеринг',
    'Время обработки записанной песни 12-15 рабочих дня.',
    '«Альбом» вы получаете по e-mail',
]

certificate_4 = {
    'heading': certificate_4_heading,
    'img': certificate_4_img,
    'price': certificate_4_price,
    'old_price': certificate_4_old_price,
    'list': certificate_4_list,
}


# Certificate 5

certificate_5_heading = 'Сертификат "Три хита"'
certificate_5_img = 'three_hits.jpg'
certificate_5_price = '27 900'
certificate_5_old_price = '33 000'
certificate_5_list = [
    'Запись 3-х песен на готовый минус (студия предоставляет минусовки)',
    'Аренда студии',
    'Тюнинг и монтаж вокала',
    'Сведение и мастеринг',
    'Время обработки записанной песни 5-6 рабочих дня.',
    '«Три хита» вы получаете по e-mail',
]

certificate_5 = {
    'heading': certificate_5_heading,
    'img': certificate_5_img,
    'price': certificate_5_price,
    'old_price': certificate_5_old_price,
    'list': certificate_5_list,
}


certificate_cards = {
    '1': certificate_1,
    '2': certificate_2,
    '3': certificate_3,
    '4': certificate_4,
    '5': certificate_5,
}


def get_certificate_cards():
    return certificate_cards


def get_certificate_card(certificate_id):
    return certificate_cards[str(certificate_id)]
