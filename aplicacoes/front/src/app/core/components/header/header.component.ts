import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule, MatSlideToggleModule, FormsModule]
})
export class HeaderComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    usuario: any;
    usuarioAdmin: boolean = false;

    constructor(
        private _authService: AuthService
    ) {
        
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    changeUsuarioAdmin() {

        this._authService.usuarioAdmin = this.usuarioAdmin;

    }

}