import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ImagemComponent } from '../../shared/components/imagem/imagem.component';
import { GaleriaService } from './data-access/galeria.service';
import { GaleriaComponent } from './features/shell/galeria.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { GaleriaExibicaoComponent } from './features/exibicao/exibicao.component';
import { GaleriaFormComponent } from './features/form/form.component';
import { GaleriaImagemFormComponent } from './features/form-imagem/form-imagem.component';
import { GaleriaAddImagemComponent } from './features/add-imagem/add-imagem.component';

const ModuleRoute: Route[] = [
    {
        path: '', component: GaleriaComponent
    },
    {
        path: 'exibicao', component: GaleriaExibicaoComponent
    },
    {
        path: 'form',
        canActivate: [AuthGuard],
        component: GaleriaFormComponent
    },
    {
        path: 'imagem/form',
        canActivate: [AuthGuard],
        component: GaleriaImagemFormComponent
    },
    {
        path: 'imagem/add',
        canActivate: [AuthGuard],
        component: GaleriaAddImagemComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        ImagemComponent
    ],
    declarations: [
        GaleriaComponent,
        GaleriaExibicaoComponent,
        GaleriaFormComponent,
        GaleriaImagemFormComponent,
        GaleriaAddImagemComponent
    ],
    providers: [
        GaleriaService
    ]
})
export class GaleriaModule { }