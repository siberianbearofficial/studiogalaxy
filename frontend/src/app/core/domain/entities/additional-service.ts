import { Price } from './price';

export interface AdditionalService {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: Price;
    readonly img: string;
}
