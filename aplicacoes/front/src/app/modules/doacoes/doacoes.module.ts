import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../../core/guards/auth.guard';
import { DoacoesService } from './data-access/doacoes.service';
import { DoacoesFormComponent } from './features/form/form.component';
import { DoacoesComponent } from './features/shell/shell.component';

const ModuleRoute: Route[] = [
    {
        path: '', component: DoacoesComponent
    },
    {
        path: 'form',
        canActivate: [AuthGuard],
        component: DoacoesFormComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        QuillModule.forRoot()
    ],
    declarations: [
        DoacoesComponent,
        DoacoesFormComponent
    ],
    providers: [
        DoacoesService
    ]
})
export class DoacoesModule { }