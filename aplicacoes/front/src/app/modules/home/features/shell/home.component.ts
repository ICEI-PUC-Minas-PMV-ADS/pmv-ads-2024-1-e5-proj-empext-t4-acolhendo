import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlickCarouselService } from '../../../../core/services/slick-carousel.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

    slickCarouselConfigBanner: any;
    slickCarouselConfigNutri: any;
    slickCarouselConfigEvent: any;
    slickCarouselConfigArt: any;

    banner: { url: string; descricao: string }[] = [
        {
            url: 'assets/banner/b1.png',
            descricao: 'Imagem 1'
        },
        {
            url: 'assets/banner/b2.png',
            descricao: 'Imagem 2'
        },
        {
            url: 'assets/banner/b3.png',
            descricao: 'Imagem 3'
        }
    ];

    nutricao: { url: string; descricao: string }[] = [
        {
            url: 'assets/nutricao/n1.png',
            descricao: 'Imagem 1'
        },
        {
            url: 'assets/nutricao/n2.png',
            descricao: 'Imagem 2'
        },
        {
            url: 'assets/nutricao/n3.png',
            descricao: 'Imagem 3'
        },
        {
            url: 'assets/nutricao/n4.png',
            descricao: 'Imagem 4'
        }
    ];

    eventos: { url: string; descricao: string }[] = [
        {
            url: 'assets/eventos/e1.png',
            descricao: 'Imagem 1'
        },
        {
            url: 'assets/eventos/e2.png',
            descricao: 'Imagem 2'
        },
        {
            url: 'assets/eventos/e3.png',
            descricao: 'Imagem 3'
        },
        {
            url: 'assets/eventos/e4.png',
            descricao: 'Imagem 4'
        }
    ];

    artigos: { url: string; descricao: string }[] = [
        {
            url: 'assets/artigo/a1.png',
            descricao: 'Imagem 1'
        },
        {
            url: 'assets/artigo/a2.png',
            descricao: 'Imagem 2'
        },
        {
            url: 'assets/artigo/a3.png',
            descricao: 'Imagem 3'
        },
        {
            url: 'assets/artigo/a4.png',
            descricao: 'Imagem 4'
        }
    ];

    constructor(
        private _slickCarouselService: SlickCarouselService
    ) {

    }

    ngOnInit() {

        this.slickCarouselConfigBanner = this._slickCarouselService.getConfig({
            infinite: true,
            autoplay: true,
            dots: this.banner.length > 1
        });

        this.slickCarouselConfigNutri = this._slickCarouselService.getConfig({
            autoplay: true,
            dots: this.nutricao.length > 4,
            slidesToShow: 4
        });

        this.slickCarouselConfigEvent = this._slickCarouselService.getConfig({
            autoplay: true,
            dots: this.eventos.length > 4,
            slidesToShow: 4
        });

        this.slickCarouselConfigArt = this._slickCarouselService.getConfig({
            autoplay: true,
            dots: this.artigos.length > 4,
            slidesToShow: 4
        });

    }

}