import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { eArtigo } from '../../../core/enums/artigo.enum';

@Injectable()
export class DepoimentosService {

    constructor(
        private _api: ApiService
    ) { }

    getDepoimentos(filtros: any): Observable<any> {

        return this._api.get('/article', { ...filtros, tipo: eArtigo.DEPOIMENTOS });

    }

    getDepoimento(id: number): Observable<any> {

        return this._api.get('/article/' + id);

    }

    cadastraDepoimento(dados: any): Observable<any> {

        return this._api.post('/article', dados);

    }

    salvarDepoimento(dados: any, id: number): Observable<any> {

        return this._api.put('/article/' + id, dados);

    }

    deleteDepoimento(id: number): Observable<any> {

        return this._api.delete('/article/' + id);

    }

}