import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, iif, takeUntil } from 'rxjs';
import { QuillModules } from 'ngx-quill';

import { eArtigo } from '../../../../core/enums/artigo.enum';
import { NutricaoService } from '../../data-access/nutricao.service';
import { UtilsService } from '../../../../core/services/utils.service';
import { QuillToolbar } from '../../../../core/intefaces/quill';

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

    fileImagemCapa: { file: any; url: string; };

    editorQuill;
    quillModules: QuillModules;
    @ViewChild('fileEditor') fileEditor: ElementRef;

    acceptedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
    ];

    constructor(
        private _nutricaoService: NutricaoService,
        private _formBuilder: UntypedFormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {

        this.quillModules = {
            toolbar: QuillToolbar,
            imageDropAndPaste: {
                handler: this.imageDropHandler.bind(this)
            }
        }

    }

    ngOnInit(): void {

        if (Number(this._route?.snapshot?.paramMap?.get('id')))
            this.artigoId = Number(this._route.snapshot.paramMap.get('id'));

        this.formDados = this._formBuilder.group({
            id: [null, []],
            ativo: [true, []],
            titulo: [null, [Validators.required]],
            tipo: [eArtigo.NUTRICAO, []],
            imagem_capa: [null, []],
            texto: [null, [Validators.required]],
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

                this.formDados.get('imagem_capa').setValue(imagem);

                this.fileImagemCapa = null;
                
            }

        } catch(err) {
            this.loading = false;
            this._cd.detectChanges();
            alert(err.message)
            return;
        }

        const values = this.formDados.value;

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

        const result = await confirm('Prosseguir com a remoção?');
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

        }

        this.getDados();

    }

    uploadImagem(file): Promise<any> {

        return new Promise((resolve, reject) => {

            const formData: FormData = new FormData();

            formData.append('image-article', file);

            this._nutricaoService.uploadImagem(formData)
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

    getEditorInstance(editorInstance: any) {

        this.editorQuill = editorInstance;

        const toolbar = this.editorQuill.getModule('toolbar');
        toolbar.addHandler('image', this.imageHandler.bind(this));

    }

    imageHandler(image) {

        const ths = this;

        ths.fileEditor.nativeElement.click();

    }

    async imageDropHandler(image, type, imageData) {

        const ths = this;

        ths.editorQuill.history.undo();
        
        const file = imageData.toFile(`imagem.${type.split('/')[1]}`);

        let imagem = await ths.uploadImagem(file);

        if (imagem) {

            const range = ths.editorQuill.getSelection();

            ths.editorQuill.insertEmbed(range.index, 'image', imagem, 'user');

            this.editorQuill.setSelection(range.index + 1);
    
        }

    }

    previewFile() {

        let file = this.fileEditor?.nativeElement?.files[0];

        if (!file) return;

        if (this.validarExtensao(file)) {

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {

                let imagem = new Image();
                imagem.src = reader.result as string;

                imagem.onload = async () => {
                    let imagem = await this.uploadImagem(file);
                    if (imagem) {
                        console.log(imagem)
                        const addImageRange = this.editorQuill.getSelection();
                        this.editorQuill.insertEmbed(addImageRange.index, 'image', imagem);
                        this.editorQuill.setSelection(addImageRange.index + 1);
                    }
                }
            }

        } else {
            alert(`A imagem deve ter no máximo 2MB e estar no formato PNG, JPG, JPEG ou WEBP!`);
        }

    }

    validarExtensao(file: File): boolean {
        
        return this.acceptedMimeTypes.includes(file.type) && file.size < 2000000;

    }

}