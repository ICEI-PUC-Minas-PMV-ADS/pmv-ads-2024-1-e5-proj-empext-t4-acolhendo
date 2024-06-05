import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AuthGuard } from '../../core/guards/auth.guard';
import { EmpresaService } from './data-access/empresa.service';
import { SharedModule } from '../../shared/shared.module';
import { EmpresaComponent } from './features/shell/empresa.component';

const ModuleRoute: Route[] = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: EmpresaComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
    ],
    declarations: [
        EmpresaComponent,
    ],
    providers: [
        EmpresaService
    ]
})
export class EmpresaModule { }