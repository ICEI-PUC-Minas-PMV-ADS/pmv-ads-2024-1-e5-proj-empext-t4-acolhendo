import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlyAdminDirective } from './components/onlyAdmin.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OnlyAdminDirective
    ],
    exports: [
        OnlyAdminDirective
    ]
})
export class DirectivesModule { }