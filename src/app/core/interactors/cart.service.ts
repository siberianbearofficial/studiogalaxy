import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, shareReplay, tap } from 'rxjs';
import { CartItem, CartItemType } from '../domain/entities/cart-item';
import { Certificate } from '../domain/entities/certificate';
import { v4 as uuid4 } from 'uuid';
import { AdditionalService } from '../domain/entities/additional-service';
import { Price } from '../domain/entities/price';
import { OrderDetails } from '../domain/entities/order-details';
import { removeCartItemById, sumPrices } from '../../infrastructure/helpers/cart-helpers';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private readonly items$$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
    readonly items$: Observable<CartItem[]> = this.items$$.pipe(shareReplay(1));
    readonly totalPrice$: Observable<Price> = this.items$.pipe(
        map(items => sumPrices(items.map((i) => i.data.price))),
    );
    readonly totalCount$: Observable<number> = this.items$.pipe(
        map(items => items.length),
    );

    addCertificate(data: Certificate): void {
        const item: CartItem = {
            id: uuid4(),
            data,
            type: CartItemType.Certificate,
        };
        this.items$$.next([...this.items$$.value, item]);
    }

    addAdditionalService(data: AdditionalService): void {
        const item: CartItem = {
            id: uuid4(),
            data,
            type: CartItemType.AdditionalService,
        };
        this.items$$.next([...this.items$$.value, item]);
    }

    removeItem(id: string): void {
        this.items$$.next(removeCartItemById(id, this.items$$.value));
    }

    submit(orderDetails: OrderDetails): Observable<void> {
        return of(void 0).pipe(
            tap(() => this.items$$.next([])),
        );
    }
}
