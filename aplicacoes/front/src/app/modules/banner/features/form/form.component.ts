import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, finalize, iif, takeUntil } from 'rxjs';
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

    fileImagemDesktop: { file: any; url: string; };
    fileImagemMobile: { file: any; url: string; };

    loading: boolean = false;

    constructor(
        private _bannerService: BannerService,
        private _formBuilder: UntypedFormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        if (Number(this._route?.snapshot?.paramMap?.get('id')))
            this.imagemId = Number(this._route.snapshot.paramMap.get('id'));

        this.formDados = this._formBuilder.group({
            id: [null, []],
            ativo: [false, []],
            descricao: [null, [Validators.required]],
            ordem: [null, [Validators.required]],
            imagem_desktop: [null, []],
            imagem_mobile: [null, []],
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
                .getImagem(this.imagemId)
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

        this.fileImagemDesktop = null;
        this.fileImagemMobile = null;

        this._cd.detectChanges();

    }

    voltar() {

        this._router.navigate(['/banner']);

    }

    async salvar() {

        if (this.formDados.invalid) {
            UtilsService.validateAllFormFields(this.formDados);
            // this._dialog.showToast('Por favor verifique o formulário!');
            return;
        }

        this.loading = true;
        this._cd.detectChanges();

        try {

            if (this.fileImagemDesktop) {

                let imagem = await this.uploadImagem(this.fileImagemDesktop.file);

                this.formDados.get('imagem_desktop').setValue(imagem);

                this.fileImagemDesktop = null;
                
            }
    
            if (this.fileImagemMobile) {
    
                let imagem = await this.uploadImagem(this.fileImagemMobile.file);

                this.formDados.get('imagem_mobile').setValue(imagem);

                this.fileImagemMobile = null;
                
            }

        } catch(err) {
            this.loading = false;
            this._cd.detectChanges();
            alert(err.message)
            return;
        }

        const values = this.formDados.value;

        iif(() => !!this.imagemId,
            this._bannerService.salvarImagem(values, this.imagemId),
            this._bannerService.cadastraImagem(values))
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: (res) => {

                    // this._dialog.showToast('Registro salvo com sucesso!', 'OK');

                    this.recarregar(this.imagemId || res.id);

                },
                error: (err) => {

                    // this._dialog.error(err, 'Erro ao atualizar dados');

                }
            });

    }

    async apagar() {

        const result = await confirm('Prosseguir com a remoção?');
        if (!result) return;

        this.loading = true;
        this._cd.detectChanges();

        this._bannerService.deleteImagem(this.imagemId)
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

        if (!this.imagemId) {

            this._router.navigate(['/banner/form', { id }]);

            this.imagemId = id;

        }

        this.getDados();

    }

    changeImagemDesktop(dados) {

        this.fileImagemDesktop = dados;

    }

    changeImagemMobile(dados) {

        this.fileImagemMobile = dados;

    }

    uploadImagem(file): Promise<any> {

        return new Promise((resolve, reject) => {

            const formData: FormData = new FormData();

            formData.append('image-banner', file);

            this._bannerService.uploadImagem(formData)
                .pipe(
                    takeUntil(this._unsubscribeAll)
                )
                .subscribe({
                    next: (res) => {

                        resolve(res.image);

                    },
                    error: (err) => {

                        reject;

                    }
                });

        });

    }

}