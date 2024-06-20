import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class EmpresaService {

    constructor(
        private _api: ApiService
    ) { }

    getCompany(): Observable<any> {

        return this._api.get('/company', {});

    }

    salvarEmpresa(dados: any): Observable<any> {

        return this._api.put('/company', dados);

    }

}
