import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlyAdminDirective } from './components/onlyAdmin.directive';
import { UsuarioDeslogadoDirective } from './components/usuarioDeslogado.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        OnlyAdminDirective,
        UsuarioDeslogadoDirective
    ],
    exports: [
        OnlyAdminDirective,
        UsuarioDeslogadoDirective
    ]
})
export class DirectivesModule { }