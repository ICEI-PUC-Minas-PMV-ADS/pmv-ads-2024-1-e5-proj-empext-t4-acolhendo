import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './features/shell/home.component';

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
        HomeComponent
    ]
})
export class HomeModule { }