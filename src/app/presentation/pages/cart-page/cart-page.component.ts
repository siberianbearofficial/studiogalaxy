import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { AdditionalService } from '../../../core/domain/entities/additional-service';
import { ADDITIONAL_SERVICE_LIST } from '../../../infrastructure/constants/additional-services-constants';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/interactors/cart.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { from, Observable, switchMap } from 'rxjs';
import { CartItem, CartItemType } from '../../../core/domain/entities/cart-item';
import { AsyncPipe } from '@angular/common';
import { Certificate } from '../../../core/domain/entities/certificate';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-cart-page',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, AsyncPipe],
    templateUrl: './cart-page.component.html',
    styleUrl: './cart-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent {
    private readonly cartService: CartService = inject(CartService);
    private readonly formBuilder: FormBuilder = inject(FormBuilder);
    private readonly router: Router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly form: FormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        tel: ['', Validators.required],
        promo: '',
        comment: '',
    });

    protected getDescriptionPoints(item: CartItem): string[] {
        switch (item.type) {
            case CartItemType.Certificate: {
                return (item.data as Certificate).descriptionPoints;
            }
            case CartItemType.AdditionalService: {
                return [(item.data as AdditionalService).description];
            }
            default: {
                return [];
            }
        }
    }

    protected addAdditionalService(additionalService: AdditionalService): void {
        this.cartService.addAdditionalService(additionalService);
    }

    protected submit(): void {
        if (this.form.value.name.length > 0 && this.form.value.email.length > 0 && this.form.value.tel.length > 0) {
            this.cartService
                .submit(this.form.value)
                .pipe(
                    switchMap(() => {
                        alert('Заявка оформлена! Ожидайте звонка менеджера на указанный номер телефона.');
                        return from(this.router.navigateByUrl('/'));
                    }),
                    takeUntilDestroyed(this.destroyRef),
                )
                .subscribe();
        } else {
            alert('Сначала заполните обязательные поля: имя, email и телефон');
        }
    }

    protected readonly ADDITIONAL_SERVICE_LIST: AdditionalService[] = ADDITIONAL_SERVICE_LIST;
    protected readonly items$: Observable<CartItem[]> = this.cartService.items$;
}
