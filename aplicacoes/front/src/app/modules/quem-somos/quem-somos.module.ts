import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../../core/guards/auth.guard';
import { QuemSomosService } from './data-access/quem-somos.service';
import { QuemSomosFormComponent } from './features/form/form.component';
import { QuemSomosComponent } from './features/shell/shell.component';

const ModuleRoute: Route[] = [
    {
        path: '', component: QuemSomosComponent
    },
    {
        path: 'form',
        canActivate: [AuthGuard],
        component: QuemSomosFormComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        QuillModule.forRoot()
    ],
    declarations: [
        QuemSomosComponent,
        QuemSomosFormComponent
    ],
    providers: [
        QuemSomosService
    ]
})
export class QuemSomosModule { }