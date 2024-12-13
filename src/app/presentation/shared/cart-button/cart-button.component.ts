import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../core/interactors/cart.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cart-button',
    standalone: true,
    imports: [
        AsyncPipe,
        RouterLink,
    ],
    templateUrl: './cart-button.component.html',
    styleUrl: './cart-button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartButtonComponent {
    private readonly cartService: CartService = inject(CartService);

    protected readonly totalCount$: Observable<number> = this.cartService.totalCount$;
}
