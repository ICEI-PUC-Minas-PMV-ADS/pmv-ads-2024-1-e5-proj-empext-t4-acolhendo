import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CoreModule } from './core/core.module';
import { HTTPStatus } from './core/services/httpstatus.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [RouterOutlet, CoreModule],
})
export class AppComponent {

    loading: boolean = false;

    constructor(
        private _httpStatus: HTTPStatus
    ) {

        this._httpStatus.getHttpStatus()
            .subscribe((status: boolean) => {
                this.loading = status;
            });

    }

}
