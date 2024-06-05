import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class EmpresaService {

    constructor(
      private _api: ApiService
    ) {}

    getCompany(filtros: any): Observable<any> {
      return this._api.get('/company', filtros);
    }

    salvarEmpresa(dados: any, id: number): Observable<any>{
      return this._api.put('/company' + id, dados);
    }

}
