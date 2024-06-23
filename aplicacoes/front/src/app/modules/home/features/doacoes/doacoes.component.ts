import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';

import { HomeService } from '../../data-access/home.service';

@Component({
    selector: 'app-home-doacoes',
    templateUrl: './doacoes.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDoacoesComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    doacoes;

    loading: boolean = false;

    constructor(
        private _homeService: HomeService,
        private _cd: ChangeDetectorRef,
    ) {

    }

    ngOnInit() {

        this.getInfoDoacoes();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getInfoDoacoes() {

        this.loading = true;
        this._cd.detectChanges();

        this._homeService
            .getDoacoes()
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: res => {

                    this.doacoes = res[0];

                },
                error: err => {}
            });


    }

}