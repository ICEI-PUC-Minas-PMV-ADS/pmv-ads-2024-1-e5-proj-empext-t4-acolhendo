import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SharedModule } from '../../shared.module';
import round from 'lodash-es/round';

@Component({
    selector: 'app-imagem',
    templateUrl: './imagem.component.html',
    styleUrl: './imagem.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SharedModule]
})
export class ImagemComponent {

    @Input({ required: true }) formDados: FormGroup;
    @Input({ required: true }) campo: string;
    @Input() sizeBytes: number = 1000000; // padrao 1mb
    @Input() disabled: boolean;
    @Input() width: number;
    @Input() height: number;

    @Output() fileChangeEvent: EventEmitter<any> = new EventEmitter<any>();

    // IMAGEM Header
    @ViewChild('fileInput') fileInput: ElementRef;
    file: any;
    fileDataUrl: any;

    acceptedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
    ];

    constructor(
        private _cd: ChangeDetectorRef
    ) { }

    previewFile() {

        let file = this.fileInput?.nativeElement?.files[0];

        if (!file) return;

        if (!this.validarExtensao(file)) {

            alert(`A imagem deve estar no formato PNG, JPG, JPEG ou WEBP!`);

        } else if (!this.validarSize(file)) {

            alert(`A imagem deve ter no máximo ${this.sizeFormatado}!`);

        } else {

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {

                let imagem = new Image();
                imagem.src = reader.result as string;

                imagem.onload = () => {
                    this.imagemCarregada(file, imagem);
                }
            }

        }

    }

    validarSize(file: File): boolean {

        return file.size < this.sizeBytes;

    }

    validarExtensao(file: File): boolean {

        return this.acceptedMimeTypes.includes(file.type) && file.size < this.sizeBytes;

    }

    imagemCarregada(file: File, imagem: HTMLImageElement) {

        if (this.width && this.height && (imagem.naturalWidth != this.width || imagem.naturalHeight != this.height)) {
            alert(`A imagem deve ter uma resolução de ${this.width} x ${this.height}!`);
            return;
        }

        this.file = file;
        this.fileDataUrl = imagem.src;

        this.fileChangeEvent.emit({ file, url: imagem.src, });
        this._cd.detectChanges();
    }

    removerImagem() {

        this.file = null;
        this.fileDataUrl = null;
        this.fileInput.nativeElement.value = null;


        this.formDados.get(`${this.campo}`).setValue(null);
        this.fileChangeEvent.emit(null);

        this._cd.detectChanges();

    }

    get sizeFormatado() {

        let retorno = '';

        if (this.sizeBytes >= 1000000000) {
            retorno = round(this.sizeBytes / 1000000000, 2) + 'GB'
        } else if (this.sizeBytes >= 1000000) {
            retorno = round(this.sizeBytes / 1000000, 2) + 'MB'
        } else if (this.sizeBytes >= 1000) {
            retorno = round(this.sizeBytes / 1000, 2) + 'Kb'
        } else {
            retorno = this.sizeBytes + 'b';
        }

        return retorno.replace('.', ',')

    }

    getImagem(imagem) {

        if (imagem) {
            return imagem.split('front/src/')[1];
        }

        return ''

    }

}