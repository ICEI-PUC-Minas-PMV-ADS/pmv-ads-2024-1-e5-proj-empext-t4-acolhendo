import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { QuillModule } from 'ngx-quill';

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './features/shell/home.component';
import { HomeService } from './data-access/home.service';
import { HomeBannerComponent } from './features/banner/banner.component';
import { HomeNutricaoComponent } from './features/nutricao/nutricao.component';
import { HomeEventoComponent } from './features/eventos/eventos.component';
import { HomeArtigoComponent } from './features/artigo/artigo.component';
import { HomeGaleriasComponent } from './features/galeria/galeria.component';
import { HomeDepoimentosComponent } from './features/depoimentos/depoimentos.component';
import { HomeDoacoesComponent } from './features/doacoes/doacoes.component';

const ModuleRoute: Route[] = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        SlickCarouselModule,
        QuillModule.forRoot(),
    ],
    declarations: [
        HomeComponent,
        HomeBannerComponent,
        HomeEventoComponent,
        HomeNutricaoComponent,
        HomeArtigoComponent,
        HomeGaleriasComponent,
        HomeDepoimentosComponent,
        HomeDoacoesComponent
    ],
    providers: [
        HomeService
    ]
})
export class HomeModule { }