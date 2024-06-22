import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { DoacoesService } from '../../data-access/doacoes.service';

@Component({
    selector: 'app-doacoes',
    templateUrl: './shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoacoesComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    dados: any;

    constructor(
        private _doacoesService: DoacoesService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
    ) { }

    ngOnInit() {

        this.getDoacoes();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getDoacoes() {

        this._doacoesService.getDoacoes()
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

        this._router.navigate(['/doacoes/form']);

    }

}