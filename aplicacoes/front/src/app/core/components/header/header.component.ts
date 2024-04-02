import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule, MatTooltipModule, MatButtonModule, MatMenuModule, MatDividerModule]
})
export class HeaderComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    usuario: any;

    constructor(
        // private _authService: AuthService,
    ) {
        
    }

    ngOnInit() {

        // UserService.observer
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(usuario => {
        //         this.usuario = usuario;
        //     });

    }

    ngOnDestroy(): void {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    signOut() {

        // this._authService.signOut();

    }

}