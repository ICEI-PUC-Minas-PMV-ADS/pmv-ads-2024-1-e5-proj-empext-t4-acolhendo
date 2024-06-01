import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { GaleriaService } from '../../data-access/galeria.service';
import { ActivatedRoute, Router } from '@angular/router';
import round from 'lodash-es/round';

@Component({
    selector: 'app-galeria-add-imagem',
    templateUrl: './add-imagem.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaleriaAddImagemComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    galeriaId: number = 0;

    @ViewChild('fileInput') fileInput: ElementRef;

    files: {
        index: number;
        file: File;
        nome: string;
        tamanho: number;
    }[] = [];

    filesInvalidos: {
        index: number;
        nome: string;
        motivo: string;
    }[] = [];

    loading: boolean = false;

    acceptedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
    ];

    sizeBytes: number = 5000000;

    constructor(
        private _galeriaService: GaleriaService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {

        if (Number(this._route?.snapshot?.paramMap?.get('galeria'))) {
            this.galeriaId = Number(this._route.snapshot.paramMap.get('galeria'));
        } else {
            this.voltar();
        }

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    voltar() {

        this._router.navigate(['/galeria/exibicao', { id: this.galeriaId }]);

    }

    async salvar() {

        if (!this.files?.length) return;

        const formData: FormData = new FormData();

        for (let file of this.files) {

            formData.append('image-gallery', file.file);

        }

        formData.append('galeria_id', String(this.galeriaId));

        this._galeriaService.uploadImagens(formData)
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => {
                    this.loading = false;
                    this._cd.detectChanges();
                })
            )
            .subscribe({
                next: (res) => {

                    this.voltar();

                },
                error: (err) => {

                }
            });

    }

    previewFile() {

        let files = this.fileInput?.nativeElement?.files as File[];

        if (!files?.length) return;
        
        for (let file of files) {

            if (!this.validarExtensao(file)) {

                this.filesInvalidos.push({
                    nome: file.name,
                    motivo: `Formato inválido.`,
                    index: this.filesInvalidos.length
                });

            } else if (!this.validarSize(file)) {

                this.filesInvalidos.push({
                    nome: file.name,
                    motivo: `Tamanho excedido: ${this.sizeFormatado(file.size)} de ${this.sizeFormatado(this.sizeBytes)}`,
                    index: this.filesInvalidos.length
                });

            } else {

                this.files.push({
                    file,
                    nome: file.name,
                    tamanho: file.size,
                    index: this.files.length
                });

            }

        }

        this.fileInput.nativeElement.value = '';

    }

    validarExtensao(file: File): boolean {

        return this.acceptedMimeTypes.includes(file.type);

    }

    validarSize(file: File): boolean {

        return file.size < this.sizeBytes;

    }

    sizeFormatado(size: number) {

        let retorno = '';

        if (size >= 1000000000) {
            retorno = round(size / 1000000000, 2) + 'GB'
        } else if (size >= 1000000) {
            retorno = round(size / 1000000, 2) + 'MB'
        } else if (size >= 1000) {
            retorno = round(size / 1000, 2) + 'Kb'
        } else {
            retorno = size + 'b';
        }

        return retorno.replace('.', ',')

    }

    adicionarImagens() {

        this.fileInput.nativeElement.click();

    }

    removerArquivo(index: number) {

        this.files.splice(index, 1);

    }

}