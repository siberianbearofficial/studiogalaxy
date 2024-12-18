import { Certificate } from './certificate';
import { AdditionalService } from './additional-service';

export enum CartItemType {
    Certificate = 'certificate',
    AdditionalService = 'additional_service',
}

export type CartItemData = Certificate | AdditionalService;

export interface CartItem {
    readonly id: string;
    readonly type: CartItemType;
    readonly data: CartItemData;
}
