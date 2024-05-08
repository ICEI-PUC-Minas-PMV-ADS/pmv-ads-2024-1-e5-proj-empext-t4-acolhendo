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
        let rows = [];

        for (let i = 1; i < 21; i++) {

            rows.push({
                id: i,
                ativo: true,
                tipo: eArtigo.ARTIGO,
                imagemCapa: 'assets/artigo/a1.png',
                titulo: `${i} Artigo`,
                texto: `
                <p>Artigo</p>
                <p>Artigo</p>
                <p>Artigo</p>
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

    getArtigo(id: number): Observable<any> {

        // return this._api.get('/nutricao/get', { id });

        // TODO: TESTE
        return of({
            id: 1,
            ativo: true,
            tipo: eArtigo.ARTIGO,
            imagemCapa: 'assets/nutricao/n1.png',
            titulo: `${1} Artigo`,
            texto: `
                <p>Artigo</p>
                <p>Artigo</p>
                <p>Artigo</p>
            `,
            telaPrincipal: true,
            dataInclusao: '2024-04-16T01:21:44.380Z'
        })

    }

    salvarArtigo(dados: any): Observable<any> {

        return this._api.post('/artigoT/save', dados);

    }

    deleteArtigo(dados: any): Observable<any> {

        return this._api.post('/artigoT/delete', dados);

    }

}
