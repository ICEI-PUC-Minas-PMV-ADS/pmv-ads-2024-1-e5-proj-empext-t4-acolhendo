import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { SlickCarouselService } from '../../../../core/services/slick-carousel.service';
import { HomeService } from '../../data-access/home.service';
import { IArtigo } from '../../../../core/intefaces/interfaces';

@Component({
    selector: 'app-home-eventos',
    templateUrl: './eventos.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeEventoComponent {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    slickCarouselConfigEvento: any;

    eventos: IArtigo[] = [];

    loading: boolean = false;

    constructor(
        private _homeService: HomeService,
        private _slickCarouselService: SlickCarouselService,
        private _cd: ChangeDetectorRef,
        private _router: Router,
    ) {

    }

    ngOnInit() {

        this.getEventos();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getEventos() {

        this.loading = true;
        this._cd.detectChanges();

        this._homeService
            .getEventos()
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges() })
            )
            .subscribe({
                next: res => {

                    this.eventos = res;
                    this.configuraCarousel();

                },
                error: err => {}
            });


    }

    configuraCarousel() {

        this.slickCarouselConfigEvento = this._slickCarouselService.getConfig({
            autoplay: true,
            dots: this.eventos.length > 4,
            slidesToShow: 4
        });

    }

    abrirArtigo(id: number) {

        this._router.navigate(['/evento/artigo', { id }]);

    }

    getImagem(imagem) {

        if (imagem) {
            return imagem.split('front/src/')[1];
        }

        return ''

    }

}