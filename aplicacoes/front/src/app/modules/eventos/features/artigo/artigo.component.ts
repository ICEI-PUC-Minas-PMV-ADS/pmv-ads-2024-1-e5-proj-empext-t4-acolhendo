import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { EventoService } from '../../data-access/evento.service';
import { IArtigo } from '../../../../core/intefaces/interfaces';

@Component({
    selector: 'app-evento-artigo',
    templateUrl: './artigo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventoArtigoComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    artigo: IArtigo;
    artigoId: number | null = null;

    constructor(
        private _eventoService: EventoService,
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

            this._eventoService
                .getEvento(this.artigoId)
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

        this._router.navigate(['/evento']);

    }

    editar() {

        this._router.navigate(['/evento/form', { id: this.artigoId }]);

    }

}
