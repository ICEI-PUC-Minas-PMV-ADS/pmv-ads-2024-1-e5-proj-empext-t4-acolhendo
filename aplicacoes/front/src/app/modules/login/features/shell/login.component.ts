import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { LoginService } from '../../data-access/login.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    public formAuth: FormGroup;

    constructor(
        private _authService: AuthService,
        private _loginService: LoginService,
        private _router: Router,
        private _formBuilder: FormBuilder,

    ) {

    }

    ngOnInit() {

        this.formAuth = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        })

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    logar() {

        if (this.formAuth.invalid) {
            return;
        }

        this._loginService.sign({
            email: this.formAuth.value.email,
            senha: this.formAuth.value.password
        })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe({
                next: (res) => {

                    this._authService.token = res.accessToken;
                    this._authService.usuarioAdmin = true;

                    this._router.navigate(['/']);

                    alert('Administrador logado com sucesso!');

                },
                error: (err) => {
                    
                }
            });

    }

    setuser() {

        this.formAuth.get('email').setValue('usuario@teste.com');
        this.formAuth.get('password').setValue('senha123');

    }

}
