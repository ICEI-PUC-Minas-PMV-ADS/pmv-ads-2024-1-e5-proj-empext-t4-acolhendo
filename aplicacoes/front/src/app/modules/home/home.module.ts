import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './features/shell/home.component';
import { HomeService } from './data-access/home.service';
import { HomeBannerComponent } from './features/banner/banner.component';
import { HomeNutricaoComponent } from './features/nutricao/nutricao.component';
import { HomeEventoComponent } from './features/eventos/eventos.component';
import { HomeArtigoComponent } from './features/artigo/artigo.component';
import { HomeGaleriasComponent } from './features/galeria/galeria.component';

const ModuleRoute: Route[] = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule,
        SlickCarouselModule
    ],
    declarations: [
        HomeComponent,
        HomeBannerComponent,
        HomeEventoComponent,
        HomeNutricaoComponent,
        HomeArtigoComponent,
        HomeGaleriasComponent
    ],
    providers: [
        HomeService
    ]
})
export class HomeModule { }