import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';
import { Observable, of } from 'rxjs';
import { eArtigo } from '../../../core/enums/artigo.enum';

@Injectable()
export class ArtigoTService {

    constructor(
        private _api: ApiService
    ) {

    }

    getArtigos(filtros: any): Observable<any> {

        // return this._api.get('/nutricao/lista', filtros);

        // TODO: TESTE
        return this._api.get('/article', { ...filtros, tipo: eArtigo.ARTIGO });

    }

    getArtigo(id: number): Observable<any> {

        // return this._api.get('/nutricao/get', { id });

        // TODO: TESTE
        return this._api.get('/article/', + id);

    }

    cadastraArtigoT(dados: any): Observable<any>{
      return this._api.post('/article', dados);
    }

    salvarArtigo(dados: any, id: number): Observable<any> {

        return this._api.put('/article/' + id, dados);

    }

    deleteArtigo(id: number): Observable<any> {

        return this._api.delete('/article/' + id);

    }

}
