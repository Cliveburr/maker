import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import * as view from '../view';

export const AppRouting: ModuleWithProviders = RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: view.PublicLayoutComponent, children: [
        { path: 'home', component: view.HomeComponent },
        { path: 'prepare', component: view.PrepareComponent },
        { path: 'prepare/adjust', component: view.PrepareAdjustComponent },
        { path: 'devices', component: view.DevicesComponent },
        { path: 'simulate', component: view.SimulateComponent }
    ] },
    { path: '**', component: view.NotFoundComponent }
], { enableTracing: false, useHash: true });

export const VIEWS: any[] = [
    view.PublicLayoutComponent,
    view.HomeComponent,
    view.NotFoundComponent,
    view.PrepareComponent,
    view.PrepareAdjustComponent,
    view.DevicesComponent,
    view.SimulateComponent
];