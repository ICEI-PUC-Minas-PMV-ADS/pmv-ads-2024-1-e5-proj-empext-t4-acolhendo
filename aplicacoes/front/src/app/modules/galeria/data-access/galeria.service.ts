import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class GaleriaService {

    constructor(
        private _api: ApiService
    ) {

    }

    getGalerias(filtros: any): Observable<any> {

        return this._api.get('/gallery', filtros);

    }

    getGaleriaById(id: number): Observable<any> {

        return this._api.get('/gallery/' + id);

    }

    cadastraGaleria(dados: any): Observable<any> {

        return this._api.post('/gallery', dados);

    }

    salvarGaleria(dados: any, id: number): Observable<any> {

        return this._api.put('/gallery/' + id, dados);

    }

    deleteGaleria(id: number): Observable<any> {

        return this._api.delete('/gallery/' + id);

    }

    uploadImagem(dados: any): Observable<any> {

        return this._api.postImagem('/gallery/image', dados);

    }

    // IMAGENS

    getImagemById(id: number): Observable<any> {

        return this._api.get('/gallery/image/' + id);

    }

    uploadImagens(dados: any): Observable<any> {

        return this._api.postImagem('/gallery/images', dados);

    }

    getImagensGaleria(id: number, filtros: any): Observable<any> {

        return this._api.get('/gallery/images/' + id, filtros);

    }

    deleteImagemGaleria(id: number): Observable<any> {

        return this._api.delete('/gallery/images/' + id);

    }

}