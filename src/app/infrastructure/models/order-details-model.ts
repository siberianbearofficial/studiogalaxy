export enum PaymentTypeModel {
    Cash = 'cash',
    Cashless = 'cashless',
}

export interface OrderDetailsModel {
    readonly name: string;
    readonly recipient?: string;
    readonly email: string;
    readonly tel: string;
    readonly promo?: string;
    readonly comment?: string;
    readonly payment_type: PaymentTypeModel;
}
