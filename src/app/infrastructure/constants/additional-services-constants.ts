import { AdditionalService } from '../../core/domain/entities/additional-service';

export const ADDITIONAL_SERVICE_LIST: AdditionalService[] = [
    {
        id: '0',
        name: 'Фотосъемка во время записи',
        description: 'С последующей обработкой фотографий.',
        price: { rubles: 8900, pennies: 0 },
        img: 'img/additionalServices/test.png',
    },
    {
        id: '1',
        name: 'Видеосъемка во время записи',
        description: 'С последующим монтажом видеоклипа на песню.',
        price: { rubles: 15900, pennies: 0 },
        img: 'img/additionalServices/test.png',
    },
    {
        id: '2',
        name: 'Доплата за участника в съемке видеоклипа',
        description: 'Для неучаствующих в записи.',
        price: { rubles: 3000, pennies: 0 },
        img: 'img/additionalServices/test.png',
    },
    {
        id: '3',
        name: 'Прическа и макияж для фото/видео съемки',
        description: 'За 1 персону. С выездом на студию.',
        price: { rubles: 10000, pennies: 0 },
        img: 'img/additionalServices/test.png',
    },
    {
        id: '4',
        name: 'Запись живого инструмента самостоятельно',
        description: 'За 1 час для 1 инструмента (с монтажом)',
        price: { rubles: 6500, pennies: 0 },
        img: 'img/additionalServices/test.png',
    },
];
