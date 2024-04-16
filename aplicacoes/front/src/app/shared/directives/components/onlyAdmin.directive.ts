import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';

@Directive({
    selector: '[onlyAdmin]',
})
export class OnlyAdminDirective {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    usuarioAdmin: boolean = false;

    constructor(
        public _authService: AuthService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
    ) {

        // TODO: PARA TESTE
        // QUANDO FOR PRA VALER, USAR O PARAMETRO authenticated
        AuthService.usuarioAdminObservable
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(admin => {

                this.usuarioAdmin = admin;

                this.validaDiretiva();

            });

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    validaDiretiva() {

        if (this.checkPermission()) {

            this.viewContainer.createEmbeddedView(this.templateRef);

        } else {

            this.viewContainer.clear();

        }

    }

    checkPermission() {

        return this.usuarioAdmin;

    }

}