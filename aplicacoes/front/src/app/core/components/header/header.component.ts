import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule]
})
export class HeaderComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    usuario: any;

    constructor() {
        
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

}