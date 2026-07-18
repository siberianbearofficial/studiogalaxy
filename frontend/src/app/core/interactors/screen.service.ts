import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, EMPTY, fromEvent, Observable, shareReplay, switchMap, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScreenService {
    private readonly savedScrollPos$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private readonly scrollPos$$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    private readonly mainScreenLocked$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly mainScreenLocked$: Observable<boolean> = this.mainScreenLocked$$.pipe(
        distinctUntilChanged(),
        shareReplay(1),
    );

    init(): Observable<never> {
        return fromEvent(window, 'scroll').pipe(
            tap(() => this.scrollPos$$.next(pageYOffset)),
            switchMap(() => EMPTY),
        );
    }

    saveScrollPos(): void {
        this.savedScrollPos$$.next(this.scrollPos$$.value);
    }

    restoreScrollPos(): void {
        document.documentElement.scrollTop = this.savedScrollPos$$.value;
        document.body.scrollTop = this.savedScrollPos$$.value;
    }

    lockMainScreen(): void {
        this.saveScrollPos();
        this.mainScreenLocked$$.next(true);
    }

    unlockMainScreen(): void {
        this.mainScreenLocked$$.next(false);
        this.restoreScrollPos();
    }

    scrollScreenTo(hash: string): void {
        location.hash = '#' + hash;
    }
}
