import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Subject, finalize, merge, takeUntil, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UtilsService } from '../../../../core/services/utils.service';
import { GaleriaService } from '../../data-access/galeria.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-galeria-exibicao',
    templateUrl: './exibicao.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaleriaExibicaoComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    items: Array<any>;
    itemsCount = 0;

    pageLimit = 12;
    pageLimits = [12, 24, 48, 96];

    showError: boolean = false;

    @ViewChild(MatPaginator) private _paginator: MatPaginator | null = null;

    searchInputControl: UntypedFormControl = new UntypedFormControl();

    galeriaTitulo: string;
    galeriaId: number;

    constructor(
        private _galeriaService: GaleriaService,
        private _authService: AuthService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {

    }

    ngOnInit() {

        if (Number(this._route?.snapshot?.paramMap?.get('id')))
            this.galeriaId = Number(this._route.snapshot.paramMap.get('id'));

        if (this._route?.snapshot?.paramMap?.get('titulo'))
            this.galeriaTitulo = this._route.snapshot.paramMap.get('titulo');

        this._cd.detectChanges();

        this.getDados();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getDados() {

        const filtros = {
            filtro: this.searchInputControl.value,
            page: this._paginator?.pageIndex ?? 0,
            limit: this.pageLimit
        };

        this._galeriaService.getImagensGaleria(this.galeriaId, filtros)
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe({
                next: res => {

                    this.items = res.rows;
                    if (!this._paginator?.pageIndex) this.itemsCount = res.count;

                    this._cd.detectChanges();

                },
                error: err => {

                    // this.voltar();

                }
            });

    }

    ngAfterViewInit() {

        merge(this._paginator?.page)
            .pipe(
                takeUntil(this._unsubscribeAll),
                tap(() => {
                    UtilsService.moveScrollTop();
                    this.pesquisaBtn();
                })
            )
            .subscribe();

    }

    pesquisaBtn() {

        this.getDados();

    }

    voltar() {

        this._router.navigate(['/galeria']);

    }

    editar() {

        this._router.navigate(['/galeria/form', { id: this.galeriaId }]);

    }

    novaImagem() {

        this._router.navigate(['/galeria/imagem/add', { galeria: this.galeriaId }]);

    }

    editarImagem(id) {

        if (!this._authService.authenticated) return;

        this._router.navigate(['/galeria/imagem/form', { id, galeria: this.galeriaId }]);

    }

}