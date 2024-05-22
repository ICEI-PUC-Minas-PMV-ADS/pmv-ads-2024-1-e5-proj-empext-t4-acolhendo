import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UntypedFormControl } from '@angular/forms';
import { Subject, finalize, merge, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';

import { UtilsService } from '../../../../core/services/utils.service';
import { EventoService } from '../../data-access/evento.service';

@Component({
    selector: 'app-eventos',
    templateUrl: './evento.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventoComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    items: Array<any>;
    itemsCount = 0;

    pageLimit = 12;
    pageLimits = [12, 24, 48, 96];

    showError: boolean = false;

    @ViewChild(MatPaginator) private _paginator: MatPaginator | null = null;

    searchInputControl: UntypedFormControl = new UntypedFormControl();

    constructor(
        private _eventoService: EventoService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
    ) {

    }

    ngOnInit() {

        this.getDados();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getDados() {

        const filtros = {
            filtro: this.searchInputControl.value,
            page: (this._paginator?.pageIndex ?? 0) * this.pageLimit,
            limit: this.pageLimit
        };

        this._eventoService.getEventos(filtros)
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => {
                    this.showError = false;
                    this._cd.detectChanges();
                })
            )
            .subscribe({
                next: res => {

                    this.items = res.rows;
                    if (!this._paginator?.pageIndex) this.itemsCount = res.count;

                    this._cd.detectChanges();

                },
                error: err => {

                    this.showError = true;

                    this._cd.detectChanges();

                }
            });

    }

    ngAfterViewInit() {

        if (this._paginator) {

            merge(this._paginator.page)
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    tap(() => {
                        UtilsService.moveScrollId('lista');
                        this.pesquisaBtn();
                    })
                )
                .subscribe();

        }

    }

    pesquisaBtn() {

        this.getDados();

    }

    limparBtn() {

        this.searchInputControl.setValue(null);

    }

    novoArtigo() {

        this._router.navigate(['/evento/form']);

    }

    abrirArtigo(id: number) {

        this._router.navigate(['/evento/artigo', { id }]);

    }

    getImagem(imagem) {

        if (imagem) {
            return imagem.split('front/src/')[1];
        }

        return ''

    }

}
