import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, finalize, iif, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { GaleriaService } from '../../data-access/galeria.service';
import { UtilsService } from '../../../../core/services/utils.service';

@Component({
    selector: 'app-galeria-imagem-form',
    templateUrl: './form-imagem.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaleriaImagemFormComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    formDados: UntypedFormGroup = new UntypedFormGroup({});

    imagem;
    imagemId: number = 0;
    galeriaId: number = 0;

    loading: boolean = false;

    fileImagemCapa: { file: any; url: string; };

    constructor(
        private _galeriaService: GaleriaService,
        private _formBuilder: UntypedFormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {

        if (Number(this._route?.snapshot?.paramMap?.get('id')))
            this.imagemId = Number(this._route.snapshot.paramMap.get('id'));

        if (Number(this._route?.snapshot?.paramMap?.get('galeria')))
            this.galeriaId = Number(this._route.snapshot.paramMap.get('galeria'));

        this.formDados = this._formBuilder.group({
            id: [null, []],
            galeria_id: [null, []],
            imagem: [null, []],
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

            this._galeriaService
                .getImagemById(this.imagemId)
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

        this._router.navigate(['/galeria/exibicao', { id: this.galeriaId }]);

    }

    async salvar() {

        if (this.formDados.invalid) {
            UtilsService.validateAllFormFields(this.formDados);
            return;
        }

        this.loading = true;
        this._cd.detectChanges();

        try {

            if (this.fileImagemCapa) {

                let imagem = await this.uploadImagem(this.fileImagemCapa.file);

                this.formDados.get('imagem').setValue(imagem);

                this.fileImagemCapa = null;

            }

            this.loading = false;
            this._cd.detectChanges();

            this.voltar();

        } catch (err) {
            this.loading = false;
            this._cd.detectChanges();
            alert(err.message)
            return;
        }

        const values = this.formDados.value;

        // iif(() => !!this.galeriaId,
        //     this._galeriaService.salvarGaleria(values, this.galeriaId),
        //     this._galeriaService.cadastraGaleria(values))
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         finalize(() => { this.loading = false; this._cd.detectChanges() })
        //     )
        //     .subscribe({
        //         next: (res) => {

        //             // this._dialog.showToast('Registro salvo com sucesso!', 'OK');

        //             this.recarregar();

        //         },
        //         error: (err) => {

        //             // this._dialog.error(err, 'Erro ao atualizar dados');

        //         }
        //     });

    }

    async apagar() {

        const result = await confirm('Prosseguir com a remoção?');
        if (!result) return;

        this.loading = true;
        this._cd.detectChanges();

        this._galeriaService.deleteGaleria(this.galeriaId)
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

    uploadImagem(file): Promise<any> {

        return new Promise((resolve, reject) => {

            const formData: FormData = new FormData();

            formData.append('image-gallery', file);
            formData.append('galeria_id', String(this.galeriaId));

            this._galeriaService.uploadImagens(formData)
                .pipe(
                    takeUntil(this._unsubscribeAll)
                )
                .subscribe({
                    next: (res) => {

                        resolve(res.image);

                    },
                    error: (err) => {

                        this.loading = false;
                        this._cd.detectChanges();

                        reject;

                    }
                });

        });

    }

    changeImagemCapa(dados) {

        this.fileImagemCapa = dados;

    }

}