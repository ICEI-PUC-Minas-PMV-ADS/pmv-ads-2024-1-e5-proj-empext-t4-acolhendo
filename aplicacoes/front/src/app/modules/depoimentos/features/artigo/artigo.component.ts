import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { DepoimentosService } from '../../data-access/depoimentos.service';
import { IArtigo } from '../../../../core/intefaces/interfaces';

@Component({
    selector: 'app-depoimentos-artigo',
    templateUrl: './artigo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepoimentosArtigoComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    artigo: IArtigo;
    artigoId: number | null = null;

    constructor(
        private _depoimentosService: DepoimentosService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit(): void {

        if (Number(this._route?.snapshot?.paramMap?.get('id')))
            this.artigoId = Number(this._route.snapshot.paramMap.get('id'));

        this.getDados();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getDados() {

        if (this.artigoId) {

            this._depoimentosService
                .getDepoimento(this.artigoId)
                .pipe(
                    takeUntil(this._unsubscribeAll)
                )
                .subscribe({
                    next: res => {

                        this.artigo = res;
                        this._cd.detectChanges();

                    },
                    error: err => {

                        this.voltar();

                    }
                });

        } else {

            this.voltar();

        }

    }

    voltar() {

        this._router.navigate(['/depoimentos']);

    }

    editar() {

        this._router.navigate(['/depoimentos/form', { id: this.artigoId }]);

    }

}