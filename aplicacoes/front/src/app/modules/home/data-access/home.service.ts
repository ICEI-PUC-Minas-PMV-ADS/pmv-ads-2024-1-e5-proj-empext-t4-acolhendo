import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class HomeService {

    constructor(
        private _api: ApiService
    ) {

    }

    getBanners(): Observable<any> {

        // return this._api.get('/banner');

        // TODO: TESTE
        return of([
            {
                url: 'assets/banner/b1.png',
                descricao: 'Imagem 1'
            },
            {
                url: 'assets/banner/b2.png',
                descricao: 'Imagem 2'
            },
            {
                url: 'assets/banner/b3.png',
                descricao: 'Imagem 3'
            }
        ]);

    }

    getNutricao(): Observable<any> {

        // return this._api.get('/nutricao');

        // TODO: TESTE
        return of([
            {
                url: 'assets/nutricao/n1.png',
                descricao: 'Imagem 1'
            },
            {
                url: 'assets/nutricao/n2.png',
                descricao: 'Imagem 2'
            },
            {
                url: 'assets/nutricao/n3.png',
                descricao: 'Imagem 3'
            },
            {
                url: 'assets/nutricao/n4.png',
                descricao: 'Imagem 4'
            },
            // {
            //     url: 'assets/nutricao/n3.png',
            //     descricao: 'Imagem 3'
            // },
            // {
            //     url: 'assets/nutricao/n4.png',
            //     descricao: 'Imagem 4'
            // }
        ]);

    }

    getEventos(): Observable<any> {

        // return this._api.get('/eventos');

        // TODO: TESTE
        return of([
            {
                url: 'assets/eventos/e1.png',
                descricao: 'Imagem 1'
            },
            {
                url: 'assets/eventos/e2.png',
                descricao: 'Imagem 2'
            },
            {
                url: 'assets/eventos/e3.png',
                descricao: 'Imagem 3'
            },
            {
                url: 'assets/eventos/e4.png',
                descricao: 'Imagem 4'
            }
        ]);

    }

    getArtigos(): Observable<any> {

        // return this._api.get('/artigos');

        // TODO: TESTE
        return of([
            {
                url: 'assets/artigo/a1.png',
                descricao: 'Imagem 1'
            },
            {
                url: 'assets/artigo/a2.png',
                descricao: 'Imagem 2'
            },
            {
                url: 'assets/artigo/a3.png',
                descricao: 'Imagem 3'
            },
            {
                url: 'assets/artigo/a4.png',
                descricao: 'Imagem 4'
            }
        ]);

    }

    getQuemSomos() {

        // return this._api.get('/quem-somos');

        // TODO: TESTE
        return of({
            
        });

    }

}