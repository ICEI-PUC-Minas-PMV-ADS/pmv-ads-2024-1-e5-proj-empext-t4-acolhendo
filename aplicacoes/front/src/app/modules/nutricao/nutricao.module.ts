import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../../shared/shared.module';
import { NutricaoComponent } from './features/shell/nutricao.component';
import { NutricaoService } from './data-access/nutricao.service';
import { NutricaoFormComponent } from './features/form/form.component';
import { NutricaoArtigoComponent } from './features/artigo/artigo.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ImagemComponent } from '../../shared/components/imagem/imagem.component';

const ModuleRoute: Route[] = [
    {
        path: '', component: NutricaoComponent
    },
    {
        path: 'artigo', component: NutricaoArtigoComponent
    },
    {
        path: 'form',
        canActivate: [AuthGuard],
        component: NutricaoFormComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        QuillModule.forRoot(),
        ImagemComponent
    ],
    declarations: [
        NutricaoComponent,
        NutricaoArtigoComponent,
        NutricaoFormComponent
    ],
    providers: [
        NutricaoService
    ]
})
export class NutricaoModule { }
