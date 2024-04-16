import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { EventoComponent } from './features/shell/evento.component';
import { EventoService } from './data-access/evento.service';
import { EventoFormComponent } from './features/form/form.component';
import { EventoArtigoComponent } from './features/artigo/artigo.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { HTMLNoCssComponent } from '../../shared/components/html-no-css/html-no-css';

const ModuleRoute: Route[] = [
    {
        path: '', component: EventoComponent
    },
    {
        path: 'artigo', component: EventoArtigoComponent
    },
    {
        path: 'form',
        canActivate: [AuthGuard],
        component: EventoFormComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        HTMLNoCssComponent
    ],
    declarations: [
        EventoComponent,
        EventoArtigoComponent,
        EventoFormComponent
    ],
    providers: [
        EventoService
    ]
})
export class EventoModule { }
