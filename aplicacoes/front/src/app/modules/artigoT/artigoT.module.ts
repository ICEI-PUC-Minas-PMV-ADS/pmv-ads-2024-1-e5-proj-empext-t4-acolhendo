import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ArtigoTComponent } from './features/shell/artigoT.component';
import { ArtigoTService } from './data-access/artigoT.service';
import { ArtigoTFormComponent } from './features/form/form.component';
import { ArtigoTArtigoComponent } from './features/artigo/artigo.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { HTMLNoCssComponent } from '../../shared/components/html-no-css/html-no-css';

const ModuleRoute: Route[] = [
    {
        path: '', component: ArtigoTComponent
    },
    {
        path: 'artigo', component: ArtigoTArtigoComponent
    },
    {
        path: 'form',
        canActivate: [AuthGuard],
        component: ArtigoTFormComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        HTMLNoCssComponent
    ],
    declarations: [
        ArtigoTComponent,
        ArtigoTArtigoComponent,
        ArtigoTFormComponent
    ],
    providers: [
      ArtigoTService
    ]
})
export class ArtigoTModule { }
