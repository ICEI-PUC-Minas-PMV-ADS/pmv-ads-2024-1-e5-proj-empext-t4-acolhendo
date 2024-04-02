import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';

import { LayoutDefaultComponent } from '../default/default.component';
import { LayoutEmptyComponent } from '../empty/empty.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    standalone: true,
    imports: [NgIf, LayoutEmptyComponent, LayoutDefaultComponent]
})
export class LayoutComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    layout: 'empty' | 'default' | string = 'empty';

    constructor(
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        
        this._activatedRoute.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                this.updateLayout();
            });

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private updateLayout(): void {

        const layoutFromQueryParam = this._activatedRoute.snapshot.data['layout'];

        if (layoutFromQueryParam) {
            this.layout = layoutFromQueryParam;
        }

    }

}