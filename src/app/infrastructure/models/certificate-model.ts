import { PriceModel } from './price-model';

export interface CertificateModel {
    readonly id: string;
    readonly name: string;
    readonly img: string;
    readonly price: PriceModel;
    readonly old_price: PriceModel;
    readonly description_points: string[];
}
