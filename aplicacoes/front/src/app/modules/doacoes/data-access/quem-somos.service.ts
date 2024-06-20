import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { eArtigo } from '../../../core/enums/artigo.enum';

@Injectable()
export class QuemSomosService {

    constructor(
        private _api: ApiService
    ) {

    }

    getQuemSomos(): Observable<any> {

        return this._api.get('/article', { tipo: eArtigo.QUEMSOMOS });

    }

    cadastraQuemSomos(dados: any): Observable<any> {

        return this._api.post('/article', dados);

    }

    salvarQuemSomos(dados: any, id: number): Observable<any> {

        return this._api.put('/article/' + id, dados);

    }

    uploadImagem(dados: any): Observable<any> {

        return this._api.postImagem('/article/images', dados);

    }

}