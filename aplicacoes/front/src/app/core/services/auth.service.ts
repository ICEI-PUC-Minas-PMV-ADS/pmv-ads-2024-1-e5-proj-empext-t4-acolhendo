import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { AuthUtils } from '../uteis/auth.utils';

@Injectable({ providedIn: 'root' })
export class AuthService {

    authenticated: boolean = false;

    constructor(
        private _localStorage: LocalStorageService,
        private _userService: UserService,
        private _router: Router,
    ) {

    }

    set token(token: string) {
        this._localStorage.set('token', token);
    }

    get token(): string {
        return this._localStorage.get('token') ?? '';
    }

    signOut() {

        this._localStorage.remove('token');

        this._userService.setUsuario(null);

        this.authenticated = false;

        this._router.navigate(['/login']);

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
        _apiService: ApiService,
        _userService: UserService
    ): () => Promise<any> {

        return (): Promise<any> => {
            return new Promise((resolve, reject) => {

                // if (_authService.token) {

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