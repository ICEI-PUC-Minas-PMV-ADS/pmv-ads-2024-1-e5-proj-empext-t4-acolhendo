import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, finalize, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { BannerService } from '../../data-access/banner.service';
import { UtilsService } from '../../../../core/services/utils.service';

@Component({
    selector: 'app-banner-form',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerFormComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    formDados: UntypedFormGroup = new UntypedFormGroup({});

    imagem: any;
    imagemId: number | null = null;

    loading: boolean = false;

    constructor(
        private _bannerService: BannerService,
        private _formBuilder: UntypedFormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit(): void {

        if (Number(this._route?.snapshot?.paramMap?.get('id')))
            this.imagemId = Number(this._route.snapshot.paramMap.get('id'));

        this.formDados = this._formBuilder.group({
            id: [null, []],
            ativo: [false, []],
            titulo: [null, [Validators.required]],
            imagemDesktop: [null, [Validators.required]],
            imagemMobile: [null, [Validators.required]],
        });

        this.getDados();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getDados() {

        if (this.imagemId) {

            this.loading = true;
            this._cd.detectChanges();

            this._bannerService
                .getBanner(this.imagemId)
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

        this.imagem = dados;

        this.formDados.patchValue(this.imagem);

        this._cd.detectChanges();

    }

    voltar() {

        this._router.navigate(['/banner']);

    }

    salvar() {

        if (this.formDados.invalid) {
            UtilsService.validateAllFormFields(this.formDados);
            // this._dialog.showToast('Por favor verifique o formulário!');
            return;
        }

        const values = this.formDados.value;

        this.loading = true;
        this._cd.detectChanges();

        this._bannerService.salvarBanner(values)
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: (res) => {

                    // this._dialog.showToast('Registro salvo com sucesso!', 'OK');

                    this.recarregar(res.id);

                },
                error: (err) => {

                    // this._dialog.error(err, 'Erro ao atualizar dados');

                }
            });

    }

    recarregar(id: number) {

        if (!this.imagemId) {

            this._router.navigate(['/banner/form', { id }]);

            this.imagemId = id;

        }

        this.getDados();

    }

}