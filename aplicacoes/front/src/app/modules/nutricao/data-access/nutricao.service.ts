import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { eArtigo } from '../../../core/enums/artigo.enum';

@Injectable()
export class NutricaoService {

    constructor(
        private _api: ApiService
    ) { }

    getNutricoes(filtros: any): Observable<any> {

        return this._api.get('/article', { ...filtros, tipo: eArtigo.NUTRICAO });

    }

    getNutricao(id: number): Observable<any> {

        return this._api.get('/article/' + id);

    }

    cadastraNutricao(dados: any): Observable<any> {

        return this._api.post('/article', dados);

    }

    salvarNutricao(dados: any, id: number): Observable<any> {

        return this._api.put('/article/' + id, dados);

    }

    deleteNutricao(id: number): Observable<any> {

        return this._api.delete('/article/' + id);

    }

}