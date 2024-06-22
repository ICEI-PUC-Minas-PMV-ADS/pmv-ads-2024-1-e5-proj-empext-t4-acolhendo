import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule, DirectivesModule]
})
export class FooterComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    dadosEmpresa: {
        email: string;
        telefone: string;
        instagram: string;
        facebook: string;
        youtube: string;
    };

    constructor(
        private _authService: AuthService,
        private _apiService: ApiService,
        private _cd: ChangeDetectorRef,
    ) {
        
    }

    ngOnInit() {

        this.getDadosEmpresa();

    }

    deslogar() {

        this._authService.signOut();

    }

    getDadosEmpresa() {

        this._apiService.get('/company', {})
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe({
                next: res => {

                    this.dadosEmpresa = res;
                    this._cd.detectChanges();

                }
            });

    }

    openWhatsapp(mobile) {

        let telefoneZap = this.dadosEmpresa.telefone.replace(/[^0-9]/gi, '');

        if (mobile) {

            window.open(`whatsapp://send?phone=55${telefoneZap}`, '_blank');

        } else {

            window.open(`https://wa.me/55${telefoneZap}`, '_blank');

        }

    }

}