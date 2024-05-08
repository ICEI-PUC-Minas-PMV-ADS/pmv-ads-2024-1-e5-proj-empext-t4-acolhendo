import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class BannerService {

    constructor(
        private _api: ApiService
    ) {}

    getBanners(filtros: any): Observable<any> {

        // return this._api.get('/banner', filtros);

        // TODO: TESTE
        let rows = [];

        for (let i = 0; i < 20; i++) {
            
            rows.push({
                id: i,
                ativo: true,
                titulo: ''
            });

        }

        return of({
            rows: rows.splice(
                filtros.offset,
                filtros.limit
            ),
            count: 20
        })

    }

    getBanner(id: number): Observable<any> {

        // return this._api.get('/banner/get', { id });

        // TODO: TESTE
        return of({
            id: 1,
            ativo: true,
            titulo: '',
        })

    }

    salvarBanner(dados: any): Observable<any> {

        return this._api.post('/banner/save', dados);

    }

    deleteBanner(dados: any): Observable<any> {

        return this._api.post('/banner/delete', dados);

    }

}