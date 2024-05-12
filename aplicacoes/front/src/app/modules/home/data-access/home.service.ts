import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';
import { eArtigo } from '../../../core/enums/artigo.enum';

@Injectable()
export class HomeService {

    constructor(
        private _api: ApiService
    ) { }

    getBanners(): Observable<any> {

        return this._api.get('/banner-home');

    }

    getNutricao(): Observable<any> {

        return this._api.get('/article-home', { tipo: eArtigo.NUTRICAO });

    }

    getEventos(): Observable<any> {

        return this._api.get('/article-home', { tipo: eArtigo.EVENTO });

    }

    getArtigos(): Observable<any> {

        return this._api.get('/article-home', { tipo: eArtigo.ARTIGO });

    }

    getQuemSomos() {

        return this._api.get('/quem-somos');

    }

}