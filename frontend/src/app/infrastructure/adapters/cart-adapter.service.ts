import { inject, Injectable } from '@angular/core';
import { CartApiService } from '../api/cart-api.service';
import { map, Observable } from 'rxjs';
import { mapOrderToModel } from '../helpers/cart-helpers';
import { Order } from '../../core/domain/entities/order';

@Injectable({
    providedIn: 'root',
})
export class CartAdapterService {
    private readonly cartApi: CartApiService = inject(CartApiService);

    createOrder(order: Order): Observable<void> {
        return this.cartApi.postOrders(mapOrderToModel(order)).pipe(map(() => void 0));
    }
}
