import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class BannerService {

    constructor(
        private _api: ApiService
    ) {}

    getBanner(filtros: any): Observable<any> {

        return this._api.get('/banner', filtros);

    }

    getImagem(id: number): Observable<any> {

        return this._api.get('/banner/' + id);

    }

    cadastraImagem(dados: any): Observable<any> {

        return this._api.post('/banner', dados);

    }

    salvarImagem(dados: any, id: number): Observable<any> {

        return this._api.put('/banner/' + id, dados);

    }

    deleteImagem(id: number): Observable<any> {

        return this._api.delete('/banner/' + id);

    }

    uploadImagem(dados: any): Observable<any> {

        return this._api.postImagem('/banner/images', dados);

    }

}