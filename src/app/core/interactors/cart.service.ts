import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, shareReplay } from 'rxjs';
import { CartItem, CartItemType } from '../domain/entities/cart-item';
import { Certificate } from '../domain/entities/certificate';
import { v4 as uuid4 } from 'uuid';
import { AdditionalService } from '../domain/entities/additional-service';
import { Price } from '../domain/entities/price';
import { OrderDetails } from '../domain/entities/order-details';

export const sumPrices = (prices: Price[]): Price => {
    let sum = 0;
    prices.map((p) => 100 * p.rubles + p.pennies).forEach((pennies) => (sum += pennies));
    const rubles = Math.floor(sum / 100);
    const pennies = sum - 100 * rubles;
    return { rubles, pennies };
};

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private readonly items$$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
    readonly items$: Observable<CartItem[]> = this.items$$.pipe(shareReplay(1));
    readonly totalPrice$: Observable<Price> = this.items$.pipe(
        map((items: CartItem[]) => sumPrices(items.map((i) => i.data.price))),
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
        this.items$$.next(this.items$$.value.filter((i) => i.id !== id));
    }

    submit(orderDetails: OrderDetails): Observable<void> {
        console.info('Order details:', orderDetails);
        return of(void 0);
    }
}
