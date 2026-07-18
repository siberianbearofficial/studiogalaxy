import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Equipment } from '../../../core/domain/entities/equipment';
import { EQUIPMENT_LIST } from '../../../infrastructure/constants/equipment-constants';
import { Certificate } from '../../../core/domain/entities/certificate';
import { CERTIFICATE_LIST } from '../../../infrastructure/constants/certificate-constants';
import { PhotoCarouselComponent } from '../../shared/photo-carousel/photo-carousel.component';
import { ScreenService } from '../../../core/interactors/screen.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, distinctUntilChanged, from, Observable, shareReplay } from 'rxjs';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { ExamplesComponent } from '../../shared/examples/examples.component';
import { CartService } from '../../../core/interactors/cart.service';
import { CartButtonComponent } from '../../shared/cart-button/cart-button.component';
import { Router, RouterLink } from '@angular/router';
import { TelPipe } from '../../../infrastructure/pipes/tel.pipe';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [
        PhotoCarouselComponent,
        AsyncPipe,
        NgStyle,
        NgClass,
        ExamplesComponent,
        CartButtonComponent,
        TelPipe,
        RouterLink,
    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
    private readonly screenService: ScreenService = inject(ScreenService);
    private readonly cartService: CartService = inject(CartService);
    private readonly router: Router = inject(Router);
    private readonly destroyRef: DestroyRef = inject(DestroyRef);

    protected readonly contacts = {
        tel: '+79951177612',
        email: 'support@studiogalaxy.ru',
    };

    ngOnInit(): void {
        this.screenService.init().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    private readonly headerHidden$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    readonly headerHidden$: Observable<boolean> = this.headerHidden$$.pipe(distinctUntilChanged(), shareReplay(1));

    canChangeNavbarVisibility = true;

    private readonly navbarHidden$$ = new BehaviorSubject<boolean>(true);
    readonly navbarHidden$ = this.navbarHidden$$.pipe(distinctUntilChanged(), shareReplay(1));

    hideNavbar() {
        this.screenService.unlockMainScreen();
        this.navbarHidden$$.next(true);
        this.canChangeNavbarVisibility = true;
    }

    showNavbar() {
        this.navbarHidden$$.next(false);
        this.screenService.lockMainScreen();
        this.canChangeNavbarVisibility = true;
    }

    changeNavbarVisibility(forced: boolean = false): void {
        if (this.canChangeNavbarVisibility || forced) {
            this.canChangeNavbarVisibility = false;
            if (this.navbarHidden$$.value) {
                this.showNavbar();
            } else {
                this.hideNavbar();
            }
        }
    }

    onNavbarLinkClick(index: number) {
        if (!this.navbarHidden$$.value) this.changeNavbarVisibility(true);
        this.screenService.scrollScreenTo(
            ['certificates', 'payment', 'about', 'reviews', 'services', 'contacts', 'examples'][index],
        );
    }

    addCertificateToCart(certificate: Certificate): void {
        this.cartService.addCertificate(certificate);
        from(this.router.navigateByUrl('/cart')).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    protected readonly EQUIPMENT_LIST: Equipment[] = EQUIPMENT_LIST;
    protected readonly CERTIFICATE_LIST: Certificate[] = CERTIFICATE_LIST;
    protected readonly mainScreenLocked$: Observable<boolean> = this.screenService.mainScreenLocked$;
    protected readonly cartTotalCount$: Observable<number> = this.cartService.totalCount$;
}
