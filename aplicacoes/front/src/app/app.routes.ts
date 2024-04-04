import { Route } from '@angular/router';

import { LayoutComponent } from './core/layout/shell/layout.component';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'default'
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
            }
        ]
    },
    // AUTH
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {
            layout: 'default'
        },
        children: [
            
        ]
    },
    // NO AUTH
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'default'
        },
        children: [
            {
                path: 'login',
                loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
            }
        ]
    },
    { path: '**', redirectTo: 'home' }
];