import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    private usuario: any = null;
    public static observer: ReplaySubject<any> = new ReplaySubject<any>(1);

    constructor() { }

    set user(value: any) {

        this.usuario.next(value);

    }

    get user$(): Observable<any> {

        return this.usuario.asObservable();

    }

    setUsuario(usuario: any) {

        this.usuario = usuario;
        UserService.observer.next(usuario);

    }

    getUsuario() {

        return this.usuario;

    }

}