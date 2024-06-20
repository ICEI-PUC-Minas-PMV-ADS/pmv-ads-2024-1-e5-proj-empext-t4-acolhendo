import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ArtigoTService } from '../../data-access/artigoT.service';
import { IArtigo } from '../../../../core/intefaces/interfaces';

@Component({
    selector: 'app-artigoT-artigo',
    templateUrl: './artigo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtigoTArtigoComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    artigo: IArtigo;
    artigoId: number | null = null;

    constructor(
        private _artigoTService: ArtigoTService,
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

            this._artigoTService
                .getArtigo(this.artigoId)
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

        this._router.navigate(['/artigo']);

    }

    editar() {

        this._router.navigate(['/artigo/form', { id: this.artigoId }]);

    }

}
