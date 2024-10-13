import { Certificate } from '../../core/domain/entities/certificate';

export const CERTIFICATE_LIST: Certificate[] = [
    {
        id: '1',
        name: 'Соло "Звезда КАРАОКЕ"',
        img: 'img/certificates/karaoke_star.jpg',
        price: { rubles: 9900, pennies: 0 },
        oldPrice: { rubles: 12000, pennies: 0 },
        descriptionPoints: [
            'Запись песни на готовый минус (студия предоставляет минус)',
            'Аренда студии',
            'Тюнинг и монтаж вокала',
            'Сведение и мастеринг',
            'Время обработки записанной песни 3-4 рабочих дня.',
            '«Соло» вы получаете по e-mail',
        ],
    },
    {
        id: '2',
        name: 'Дуэт "Две звезды"',
        img: 'img/certificates/two_stars.jpg',
        price: { rubles: 14900, pennies: 0 },
        oldPrice: { rubles: 18000, pennies: 0 },
        descriptionPoints: [
            'Запись 2-х человек на готовый минус (студия предоставляет минус)',
            'Аренда студии',
            'Тюнинг и монтаж вокала',
            'Сведение и мастеринг',
            'Время обработки записанной песни 4-5 рабочих дня.',
            '«Дуэт» вы получаете по e-mail',
        ],
    },
    {
        id: '3',
        name: 'Сайфер "Созвездие"',
        img: 'img/certificates/stars.jpg',
        price: { rubles: 19900, pennies: 0 },
        oldPrice: { rubles: 24000, pennies: 0 },
        descriptionPoints: [
            'Запись 3-х (и более участников) на готовый минус (студия предоставляет минус)',
            'Стоимость рассчитывается из количества участников: за каждого дополнительного + 5 000 рублей',
            'Аренда студии',
            'Тюнинг и монтаж вокала',
            'Сведение и мастеринг',
            'Время обработки записанной песни 4-5 рабочих дня.',
            '«Сайфер» вы получаете по e-mail',
        ],
    },
    {
        id: '4',
        name: 'Сертификат "Альбом"',
        img: 'img/certificates/album.jpg',
        price: { rubles: 89900, pennies: 0 },
        oldPrice: { rubles: 108000, pennies: 0 },
        descriptionPoints: [
            'Запись десяти песен на готовый минус (студия предоставляет минусовки)',
            'Аренда студии',
            'Тюнинг и монтаж вокала',
            'Сведение и мастеринг',
            'Время обработки записанной песни 12-15 рабочих дня.',
            '«Альбом» вы получаете по e-mail',
        ],
    },
    {
        id: '5',
        name: 'Сертификат "Три хита"',
        img: 'img/certificates/three_hits.jpg',
        price: { rubles: 27900, pennies: 0 },
        oldPrice: { rubles: 33000, pennies: 0 },
        descriptionPoints: [
            'Запись 3-х песен на готовый минус (студия предоставляет минусовки)',
            'Аренда студии',
            'Тюнинг и монтаж вокала',
            'Сведение и мастеринг',
            'Время обработки записанной песни 5-6 рабочих дня.',
            '«Три хита» вы получаете по e-mail',
        ],
    },
];
