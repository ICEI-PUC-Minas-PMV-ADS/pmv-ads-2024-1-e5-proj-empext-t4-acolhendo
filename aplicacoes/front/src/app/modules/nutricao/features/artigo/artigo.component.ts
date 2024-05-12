import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { NutricaoService } from '../../data-access/nutricao.service';

@Component({
    selector: 'app-nutricao-artigo',
    templateUrl: './artigo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutricaoArtigoComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    artigo: any;
    artigoId: number | null = null;

    constructor(
        private _nutricaoService: NutricaoService,
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

            this._nutricaoService
                .getNutricao(this.artigoId)
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

        this._router.navigate(['/nutricao']);

    }

    editar() {

        this._router.navigate(['/nutricao/form', { id: this.artigoId }]);

    }

}