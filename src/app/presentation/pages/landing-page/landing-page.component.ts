import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Equipment } from '../../../core/domain/entities/equipment';
import { EQUIPMENT_LIST } from '../../../infrastructure/constants/equipment-constants';
import { Certificate } from '../../../core/domain/entities/certificate';
import { CERTIFICATE_LIST } from '../../../infrastructure/constants/certificate-constants';
import { PhotoCarouselComponent } from '../../shared/photo-carousel/photo-carousel.component';
import { ScreenService } from '../../../core/interactors/screen.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, distinctUntilChanged, Observable, shareReplay } from 'rxjs';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { ExamplesComponent } from '../../shared/examples/examples.component';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [PhotoCarouselComponent, AsyncPipe, NgStyle, NgClass, ExamplesComponent],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
    private readonly screenService = inject(ScreenService);
    private readonly destroyRef = inject(DestroyRef);

    protected readonly contacts = {
        tel: '+79951177612', // в UI лучше красиво с пробелами нарисовать, но в ссылку подставлять такой
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

    protected readonly EQUIPMENT_LIST: Equipment[] = EQUIPMENT_LIST;
    protected readonly CERTIFICATE_LIST: Certificate[] = CERTIFICATE_LIST;
    protected readonly mainScreenLocked$: Observable<boolean> = this.screenService.mainScreenLocked$;
}