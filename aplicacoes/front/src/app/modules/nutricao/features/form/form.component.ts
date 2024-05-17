import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, iif, takeUntil } from 'rxjs';

import { eArtigo } from '../../../../core/enums/artigo.enum';
import { NutricaoService } from '../../data-access/nutricao.service';
import { UtilsService } from '../../../../core/services/utils.service';

@Component({
    selector: 'app-nutricao-form',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NutricaoFormComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    formDados: UntypedFormGroup = new UntypedFormGroup({});

    artigo: any;
    artigoId: number = 0;

    loading: boolean = false;

    constructor(
        private _nutricaoService: NutricaoService,
        private _formBuilder: UntypedFormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit(): void {

        if (Number(this._route?.snapshot?.paramMap?.get('id')))
            this.artigoId = Number(this._route.snapshot.paramMap.get('id'));

        this.formDados = this._formBuilder.group({
            id: [null, []],
            titulo: [null, [Validators.required]],
            tipo: [eArtigo.NUTRICAO, []],
            imagem_capa: [null, [Validators.required]],
            texto: [null, []],
            tela_principal: [true, []],
        });

        this.getDados();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getDados() {

        if (this.artigoId) {

            this.loading = true;
            this._cd.detectChanges();

            this._nutricaoService
                .getNutricao(this.artigoId)
                .pipe(
                    takeUntil(this._unsubscribeAll),
                    finalize(() => { this.loading = false; this._cd.detectChanges() })
                )
                .subscribe({
                    next: res => {

                        this.editar(res);

                    },
                    error: err => {

                        this.voltar();

                    }
                });

        }

    }

    editar(dados: any) {

        this.artigo = dados;

        this.formDados.patchValue(this.artigo);

        this._cd.detectChanges();

    }

    voltar() {

        this._router.navigate(['/nutricao']);

    }

    salvar() {

        if (this.formDados.invalid) {
            UtilsService.validateAllFormFields(this.formDados);
            return;
        }

        const values = this.formDados.value;

        this.loading = true;
        this._cd.detectChanges();

        iif(() => !!this.artigoId,
            this._nutricaoService.salvarNutricao(values, this.artigoId),
            this._nutricaoService.cadastraNutricao(values))
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: (res) => {

                    // this._dialog.showToast('Registro salvo com sucesso!', 'OK');

                    this.recarregar(this.artigoId || res.id);

                },
                error: (err) => {

                    // this._dialog.error(err, 'Erro ao atualizar dados');

                }
            });

    }

    async apagar() {

        const result = await confirm('Prossegui com a remoção?');
        if (!result) return;

        this.loading = true;
        this._cd.detectChanges();

        this._nutricaoService.deleteNutricao(this.artigoId)
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: (res) => {

                    // this._dialog.showToast('Registro salvo com sucesso!', 'OK');

                    this.voltar();

                },
                error: (err) => {

                    // this._dialog.error(err, 'Erro ao atualizar dados');

                }
            });

    }

    recarregar(id: number) {

        if (!this.artigoId) {

            this._router.navigate(['/nutricao']);
            // this._router.navigate(['/nutricao/form', { id }]);
            // this.artigoId = id;

        }

        this.getDados();

    }

}