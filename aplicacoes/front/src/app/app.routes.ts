import { Route } from '@angular/router';

import { LayoutComponent } from './core/layout/shell/layout.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    // AUTH
    {
        path: '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'default'
        },
        children: [
            
        ]
    },
    // NO AUTH
    {
        path: '',
        // canActivate: [NoAuthGuard],
        // canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            
        ]
    },
    { path: '**', redirectTo: 'home' }
];
