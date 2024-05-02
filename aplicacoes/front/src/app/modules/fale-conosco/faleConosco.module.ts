import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { FaleConoscoComponent } from '../fale-conosco/shell/faleConosco.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { HTMLNoCssComponent } from '../../shared/components/html-no-css/html-no-css';

const ModuleRoute: Route[] = [
    {
        path: '', component: FaleConoscoComponent
    },
    {
        path: 'artigo', component: FaleConoscoComponent
    },
    {
        path: 'form',
        canActivate: [AuthGuard],
        component: FaleConoscoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        HTMLNoCssComponent
    ],
    declarations: [
      FaleConoscoComponent
    ]
})
export class FaleConoscoModule { }
