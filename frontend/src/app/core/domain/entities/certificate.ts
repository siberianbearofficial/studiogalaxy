import { Price } from './price';

export interface Certificate {
    readonly id: string;
    readonly name: string;
    readonly img: string;
    readonly price: Price;
    readonly oldPrice: Price;
    readonly descriptionPoints: string[];
}
