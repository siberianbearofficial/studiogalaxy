export interface OrderDetails {
    readonly name: string;
    readonly email: string;
    readonly tel: string;
    readonly promo?: string;
    readonly comment?: string;
}
