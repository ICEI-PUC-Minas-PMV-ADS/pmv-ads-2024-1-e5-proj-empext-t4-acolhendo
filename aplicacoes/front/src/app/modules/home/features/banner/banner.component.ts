import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';

import { SlickCarouselService } from '../../../../core/services/slick-carousel.service';
import { HomeService } from '../../data-access/home.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-banner',
    templateUrl: './banner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeBannerComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    slickCarouselConfigBanner: any;

    banner: { id: number; descricao: string; imagem_desktop: string; imagem_mobile: string; }[] = [];

    loading: boolean = false;

    constructor(
        private _homeService: HomeService,
        private _slickCarouselService: SlickCarouselService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
    ) {

    }

    ngOnInit() {

        this.getBanner();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getBanner() {

        this.loading = true;
        this._cd.detectChanges();

        this._homeService
            .getBanners()
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: res => {

                    this.banner = res;
                    this.configuraCarousel();

                },
                error: err => {}
            });


    }

    configuraCarousel() {

        this.slickCarouselConfigBanner = this._slickCarouselService.getConfig({
            infinite: true,
            autoplay: true,
            dots: this.banner.length > 1,
            speed: 1000,
            fade: true
        });

    }

    manutencaoBanner() {

        this._router.navigate(['/banner']);

    }

}