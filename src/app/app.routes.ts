import { Routes } from '@angular/router';
import { LandingPageComponent } from './presentation/pages/landing-page/landing-page.component';
import { CartPageComponent } from './presentation/pages/cart-page/cart-page.component';

export const routes: Routes = [
    { path: '', title: 'Студия звукозаписи Галактика', component: LandingPageComponent },
    { path: 'cart', title: 'Корзина', component: CartPageComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
];
