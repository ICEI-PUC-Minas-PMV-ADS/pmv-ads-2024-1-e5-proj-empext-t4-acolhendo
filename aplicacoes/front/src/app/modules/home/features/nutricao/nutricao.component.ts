import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { SlickCarouselService } from '../../../../core/services/slick-carousel.service';
import { HomeService } from '../../data-access/home.service';
import { IArtigo } from '../../../../core/intefaces/interfaces';

@Component({
    selector: 'app-home-nutricao',
    templateUrl: './nutricao.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNutricaoComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    slickCarouselConfigNutri: any;

    nutricao: IArtigo[] = [];

    loading: boolean = false;

    constructor(
        private _homeService: HomeService,
        private _slickCarouselService: SlickCarouselService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
    ) {

    }

    ngOnInit() {

        this.getNutricoes();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getNutricoes() {

        this.loading = true;
        this._cd.detectChanges();

        this._homeService
            .getNutricao()
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: res => {

                    this.nutricao = res;
                    this.configuraCarousel();

                },
                error: err => {}
            });


    }

    configuraCarousel() {

        this.slickCarouselConfigNutri = this._slickCarouselService.getConfig({
            infinite: true,
            autoplay: true,
            dots: this.nutricao.length > 4,
            slidesToShow: 4,
            autoplaySpeed: 6000
        });

    }

    abrirArtigo(id: number) {

        this._router.navigate(['/nutricao/artigo', { id }]);

    }

    getImagem(imagem) {

        if (imagem) {
            return imagem.split('front/src/')[1];
        }

        return ''

    }

}