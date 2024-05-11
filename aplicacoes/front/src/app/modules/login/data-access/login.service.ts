import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    constructor(
        private _api: ApiService
    ) {}

    sign(payload: {email: string, senha: string}):Observable<any>{
      return this._api.post('/login', payload)
    }

    forgotPassword(payload: { email: string }) {
      return this._api.post('/forgot-password', payload.email);
    }

    resetPassword(payload: {email:string, code: number, password: string}){
      return this._api.post('/reset-password', payload);
    }

}
