import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { eArtigo } from '../../../core/enums/artigo.enum';

@Injectable()
export class EventoService {

    constructor(
        private _api: ApiService
    ) {

    }

    getEventos(filtros: any): Observable<any> {

        return this._api.get('/article', {...filtros, tipo: eArtigo.EVENTO});

    }

    getEvento(id: number): Observable<any> {

        return this._api.get('/article/', + id)

    }

    cadastraEvento(dados: any): Observable<any>{
      return this._api.post('/article', dados)
    }

    salvarEvento(dados: any, id:number): Observable<any> {

        return this._api.put('/article/' + id, dados);

    }

    deleteEvento(id: number): Observable<any> {

        return this._api.delete('/article/' + id);

    }

    uploadImagem(dados: any): Observable<any> {

      return this._api.postImagem('/article/images', dados);

  }
}
