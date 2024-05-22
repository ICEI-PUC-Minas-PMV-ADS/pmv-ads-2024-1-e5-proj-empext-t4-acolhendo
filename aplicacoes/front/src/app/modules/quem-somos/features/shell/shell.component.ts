import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { QuemSomosService } from '../../data-access/quem-somos.service';

@Component({
    selector: 'app-quem-somos',
    templateUrl: './shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuemSomosComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    dados: any;

    constructor(
        private _quemSomosService: QuemSomosService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
    ) { }

    ngOnInit() {

        this.getQuemSomos();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getQuemSomos() {

        this._quemSomosService.getQuemSomos()
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => {
                    // this.showError = false;
                    this._cd.detectChanges();
                })
            )
            .subscribe({
                next: res => {

                    this.dados = res.rows[0];

                    this._cd.detectChanges();

                },
                error: err => {

                    // this._router.navigate(['/']);
                    // this.showError = true;

                    // this._cd.detectChanges();

                }
            });

    }

    editar() {

        this._router.navigate(['/quem-somos/form']);

    }

}