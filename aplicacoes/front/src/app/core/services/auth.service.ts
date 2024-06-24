import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';
import { AuthUtils } from '../uteis/auth.utils';

@Injectable({ providedIn: 'root' })
export class AuthService {

    authenticated: boolean = false;

    constructor(
        private _localStorage: LocalStorageService
    ) {

    }

    set token(token: string) {
        this._localStorage.set('token', token);
    }

    get token(): string {
        return this._localStorage.get('token') ?? '';
    }

    set usuarioAdmin(admin: boolean) {
        this.authenticated = admin;
    }

    get usuarioAdmin(): boolean {
        return this.authenticated;
    }

    signOut() {

        this._localStorage.remove('token');

        this.authenticated = false;

        window.location.reload();

    }

    check(): Observable<boolean> {

        // JA AUTENTICADO
        if (this.authenticated) {
            return of(true);
        }

        // TOKEN MEMORIA
        if (!this.token) {
            return of(false);
        }

        // CHECK EXPIRACAO TOKEN
        if (AuthUtils.isTokenExpired(this.token)) {
            return of(false);
        }

        // TEM TOKEN E NAO ESTÁ MARCADO COMO AUTENTICADO
        if (this.token) {
            this.authenticated = true;
            return of(true);
        }

        return of(false);

    }

    signInUsingToken(): Observable<any> {

        // TEM TOKEN
        if (this.token) {

            this.authenticated = true;

            return of(true);

        } else {
            return of(false);
        }

    }

    public static initApp(
        injector: Injector,
        _authService: AuthService,
        _apiService: ApiService
    ): () => Promise<any> {

        return (): Promise<any> => {
            return new Promise((resolve, reject) => {

                if (_authService.token) {
                    _authService.usuarioAdmin = true;

                }

                //     let router = injector.get(Router);

                //     _apiService.meusDados()
                //         .subscribe({
                //             next: (result) => {

                //                 _userService.setUsuario(result);

                //                 resolve(null);

                //             },
                //             error: (err) => {

                //                 _authService.signOut();

                //                 if (err.statusCode === 401 || err.status === 401) {
                //                     router.navigate(['login']);
                //                 }

                //                 resolve(null);

                //             }
                //         });

                // } else {

                //     resolve(null);

                // }
                
                resolve(null);

            });
        };

    }

}