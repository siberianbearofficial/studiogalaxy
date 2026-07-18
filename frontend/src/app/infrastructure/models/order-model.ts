import { CartItemModel } from './cart-item-model';
import { OrderDetailsModel } from './order-details-model';

export interface OrderModel {
    readonly items: CartItemModel[];
    readonly details: OrderDetailsModel;
}
