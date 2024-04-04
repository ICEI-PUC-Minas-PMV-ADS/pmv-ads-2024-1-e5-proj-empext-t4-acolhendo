import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {

    }

    private getHeaders(): any {

        let headers: HttpHeaders = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');

        if (this.authService.token) {
            headers = headers.set("Authorization", `Bearer ${this.authService.token}`);
        }

        return { headers };

    }

    post(rota: string, dados: any): Observable<any> {

        return this.http.post(`${environment.apiUrl}${rota}`, dados, this.getHeaders());

    }

    get(rota: string, filtros: any = {}): Observable<any> {

        let params: any = this.getHeaders();

        for (let f in filtros) {

            params.params = new HttpParams().set(`${f}`, JSON.stringify(filtros[f]));

        }

        return this.http.get(`${environment.apiUrl}${rota}`, params);

    }

}