export enum PaymentType {
    Cash = 'cash',
    Cashless = 'cashless',
}

export interface OrderDetails {
    readonly name: string;
    readonly recipient?: string;
    readonly email: string;
    readonly tel: string;
    readonly promo?: string;
    readonly comment?: string;
    readonly paymentType: PaymentType;
}
