import { CertificateModel } from './certificate-model';
import { AdditionalServiceModel } from './additional-service-model';


export enum CartItemModelType {
    Certificate = 'certificate',
    AdditionalService = 'additional_service',
}

export type CartItemModelData = CertificateModel | AdditionalServiceModel;

export interface CartItemModel {
    readonly id: string;
    readonly type: CartItemModelType;
    readonly data: CartItemModelData;
}
