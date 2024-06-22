import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { DepoimentosComponent } from './features/shell/depoimentos.component';
import { DepoimentosService } from './data-access/depoimentos.service';
import { DepoimentosFormComponent } from './features/form/form.component';
import { DepoimentosArtigoComponent } from './features/artigo/artigo.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const ModuleRoute: Route[] = [
    {
        path: '', component: DepoimentosComponent
    },
    {
        path: 'artigo', component: DepoimentosArtigoComponent
    },
    {
        path: 'form',
        canActivate: [AuthGuard],
        component: DepoimentosFormComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule
    ],
    declarations: [
        DepoimentosComponent,
        DepoimentosArtigoComponent,
        DepoimentosFormComponent
    ],
    providers: [
        DepoimentosService
    ]
})
export class DepoimentosModule { }
