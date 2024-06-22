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
            },
            {
                path: 'nutricao',
                loadChildren: () => import('./modules/nutricao/nutricao.module').then(m => m.NutricaoModule)
            },
            {
                path: 'evento',
                loadChildren: () => import('./modules/eventos/evento.module').then(m => m.EventoModule)
            },
            {
                path: 'artigo',
                loadChildren: () => import('./modules/artigoT/artigoT.module').then(m => m.ArtigoTModule)
            },
            {
                path: 'fale-conosco',
                loadChildren: () => import('./modules/fale-conosco/faleConosco.module').then(m => m.FaleConoscoModule)
            },
            {
                path: 'banner',
                loadChildren: () => import('./modules/banner/banner.module').then(m => m.BannerModule)
            },
            {
                path: 'quem-somos',
                loadChildren: () => import('./modules/quem-somos/quem-somos.module').then(m => m.QuemSomosModule)
            },
            {
                path: 'galeria',
                loadChildren: () => import('./modules/galeria/galeria.module').then(m => m.GaleriaModule)
            },
            {
                path: 'empresa',
                loadChildren: () => import('./modules/empresa/empresa.module').then(m => m.EmpresaModule)
            },
            {
                path: 'doacoes',
                loadComponent: () => import('./modules/doacoes/doacoes.module').then(m => m.DoacoesModule)
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
            layout: ''
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
