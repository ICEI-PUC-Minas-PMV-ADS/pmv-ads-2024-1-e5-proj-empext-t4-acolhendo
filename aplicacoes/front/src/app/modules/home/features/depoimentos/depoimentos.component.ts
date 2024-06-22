import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { SlickCarouselService } from '../../../../core/services/slick-carousel.service';
import { HomeService } from '../../data-access/home.service';
import { IArtigo } from '../../../../core/intefaces/interfaces';

@Component({
    selector: 'app-home-depoimentos',
    templateUrl: './depoimentos.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDepoimentosComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    slickCarouselConfig: any;

    artigos: IArtigo[] = [];

    loading: boolean = false;

    constructor(
        private _homeService: HomeService,
        private _slickCarouselService: SlickCarouselService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
    ) {

    }

    ngOnInit() {

        this.getArtigos();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getArtigos() {

        this.loading = true;
        this._cd.detectChanges();

        this._homeService
            .getDepoimentos()
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: res => {

                    this.artigos = res;
                    this.configuraCarousel();

                },
                error: err => {}
            });


    }

    configuraCarousel() {

        this.slickCarouselConfig = this._slickCarouselService.getConfig({
            infinite: true,
            autoplay: true,
            dots: this.artigos.length > 4,
            slidesToShow: 4,
            autoplaySpeed: 6000
        });

    }

    abrirArtigo(id: number) {

        this._router.navigate(['/depoimentos/artigo', { id }]);

    }

}