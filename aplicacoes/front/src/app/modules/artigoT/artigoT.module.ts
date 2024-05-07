import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../../shared/shared.module';
import { ArtigoTComponent } from './features/shell/artigoT.component';
import { ArtigoTService } from './data-access/artigoT.service';
import { ArtigoTFormComponent } from './features/form/form.component';
import { ArtigoTArtigoComponent } from './features/artigo/artigo.component';
import { AuthGuard } from '../../core/guards/auth.guard';

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
        QuillModule.forRoot()
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
