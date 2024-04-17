import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';
import { Observable, of } from 'rxjs';
import { eArtigo } from '../../../core/enums/artigo.enum';

@Injectable()
export class EventoService {

    constructor(
        private _api: ApiService
    ) {

    }

    getEventos(filtros: any): Observable<any> {

        // return this._api.get('/nutricao/lista', filtros);

        // TODO: TESTE
        let rows = [];

        for (let i = 0; i < 20; i++) {

            rows.push({
                id: i,
                ativo: true,
                tipo: eArtigo.EVENTO,
                imagemCapa: 'assets/eventos/e1.png',
                titulo: `${i} Evento`,
                texto: `
                <p>Evento</p>
                <p>Evento</p>
                <p>Evento</p>
             `,
                telaPrincipal: true,
                dataInclusao: '2024-04-16T01:21:44.380Z'
            })

        }

        return of({
            rows: rows.splice(
                filtros.offset,
                filtros.limit
            ),
            count: 20
        })

    }

    getEvento(id: number): Observable<any> {

        // return this._api.get('/nutricao/get', { id });

        // TODO: TESTE
        return of({
            id: 1,
            ativo: true,
            tipo: eArtigo.EVENTO,
            imagemCapa: 'assets/nutricao/n1.png',
            titulo: `${1} Evento`,
            texto: `
                <p>Evento</p>
                <p>Evento</p>
                <p>Evento</p>
            `,
            telaPrincipal: true,
            dataInclusao: '2024-04-16T01:21:44.380Z'
        })

    }

    salvarEvento(dados: any): Observable<any> {

        return this._api.post('/evento/save', dados);

    }

    deleteEvento(dados: any): Observable<any> {

        return this._api.post('/evento/delete', dados);

    }

}
