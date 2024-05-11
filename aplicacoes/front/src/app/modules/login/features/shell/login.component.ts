import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../data-access/login.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();


    public formAuth: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
    });

    constructor(
        private _loginService: LoginService,
        private _router: Router,
        private formBuilder: FormBuilder,

    ) {

    }

    ngOnDestroy() {

      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();

    }

    logar() {


        this._loginService.sign({
          email: this.formAuth.value.email,
          senha: this.formAuth.value.senha
        })
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe({
          next:(res)=>{
            return this._router.navigate(['/']);
        },
        error: (err)=>{
          console.log(err)
        }
        })



        alert('Administrador logado com sucesso!');

    }

}
