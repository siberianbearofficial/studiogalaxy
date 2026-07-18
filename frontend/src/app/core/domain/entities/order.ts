import { OrderDetails } from './order-details';
import { CartItem } from './cart-item';

export interface Order {
    readonly items: CartItem[];
    readonly details: OrderDetails;
}
