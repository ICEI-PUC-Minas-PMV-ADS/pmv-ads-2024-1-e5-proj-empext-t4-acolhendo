import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoginService } from '../../data-access/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

    constructor(
        private _loginService: LoginService
    ) {

    }

}