import { Routes } from '@angular/router';
import { LandingPageComponent } from './presentation/pages/landing-page/landing-page.component';

export const routes: Routes = [
    { path: '', title: 'Студия звукозаписи Галактика', component: LandingPageComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
];
