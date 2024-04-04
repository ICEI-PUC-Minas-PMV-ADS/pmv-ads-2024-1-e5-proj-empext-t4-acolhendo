import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './features/shell/login.component';
import { LoginService } from './data-access/login.service';

const ModuleRoute: Route[] = [
    { path: '', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ModuleRoute),
        SharedModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule { }