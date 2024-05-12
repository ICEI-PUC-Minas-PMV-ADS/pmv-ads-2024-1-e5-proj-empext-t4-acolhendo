import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';

@Directive({
    selector: '[usuarioDeslogado]',
})
export class UsuarioDeslogadoDirective {

    constructor(
        public _authService: AuthService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
    ) {

        this.validaDiretiva();

    }

    validaDiretiva() {

        if (!this._authService.authenticated) {

            this.viewContainer.createEmbeddedView(this.templateRef);

        } else {

            this.viewContainer.clear();

        }

    }

}