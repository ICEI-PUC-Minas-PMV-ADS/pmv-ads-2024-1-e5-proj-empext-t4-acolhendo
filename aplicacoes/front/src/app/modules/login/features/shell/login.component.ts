import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoginService } from '../../data-access/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

    constructor(
        private _loginService: LoginService,
        private _router: Router
    ) {

    }

    logar() {

        this._router.navigate(['/']);

        alert('Administrador logado com sucesso!');

    }

}