import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { SlickCarouselService } from '../../../../core/services/slick-carousel.service';
import { HomeService } from '../../data-access/home.service';
import { IGaleria } from '../../../../core/intefaces/interfaces';

@Component({
    selector: 'app-home-galeria',
    templateUrl: './galeria.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeGaleriasComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    slickCarouselConfigGalerias: any;

    galerias: IGaleria[] = [];

    loading: boolean = false;

    constructor(
        private _homeService: HomeService,
        private _slickCarouselService: SlickCarouselService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
    ) {

    }

    ngOnInit() {

        this.getGalerias();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getGalerias() {

        this.loading = true;
        this._cd.detectChanges();

        this._homeService
            .getGalerias()
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: res => {

                    this.galerias = res;
                    this.configuraCarousel();

                },
                error: err => {}
            });


    }

    configuraCarousel() {

        this.slickCarouselConfigGalerias = this._slickCarouselService.getConfig({
            infinite: true,
            autoplay: true,
            dots: this.galerias.length > 4,
            slidesToShow: 4,
            autoplaySpeed: 6000
        });

    }

    abrirArtigo(id: number) {

        this._router.navigate(['/galeria/exibicao', { id }]);

    }

}