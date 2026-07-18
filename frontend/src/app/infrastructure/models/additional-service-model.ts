import { PriceModel } from './price-model';

export interface AdditionalServiceModel {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly price: PriceModel;
    readonly img: string;
}
