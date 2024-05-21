import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { BannerService } from './data-access/banner.service';
import { SharedModule } from '../../shared/shared.module';
import { BannerComponent } from './features/shell/shell.component';
import { BannerFormComponent } from './features/form/form.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ImagemComponent } from '../../shared/components/imagem/imagem.component';

const ModuleRoute: Route[] = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: BannerComponent
    },
    {
        path: 'form',
        canActivate: [AuthGuard],
        component: BannerFormComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        ImagemComponent
    ],
    declarations: [
        BannerComponent,
        BannerFormComponent
    ],
    providers: [
        BannerService
    ]
})
export class BannerModule { }