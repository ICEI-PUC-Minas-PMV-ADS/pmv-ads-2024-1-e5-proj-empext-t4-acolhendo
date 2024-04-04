import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SlickCarouselService {

    private configDefault = {
        "slidesToShow": 1,       //Quantidade de slides exibidos 
        "slidesToScroll": 1,     //Quantos slides passam por vez
        "dots": false,            //Exibe pontos no inferior da pagina
        "infinite": false,        //Faz girar em loop pra sempre
        "centerMode": false,      //Permite a exibição dos outros itens na lateral
        "pauseOnFocus": true,
        "arrows": false,
        "swipe": true,
        "autoplay": false,
        "autoplaySpeed": 4000,
        "lazyLoad": 'ondemand'
    };

    private arrowsConfig = {
        "prevArrow": '<button class="slick-prev custom-arrow-slick-carousel" aria-label="Anterior"><i class="fa-solid fa-circle-chevron-left"></i></button>',
        "nextArrow": '<button class="slick-next custom-arrow-slick-carousel" aria-label="Próximo"><i class="fa-solid fa-circle-chevron-right"></i></button>'
    }

    constructor() {}

    getConfig(config = {}): any {

        return {
            ...this.configDefault,
            ...config,
            ...this.arrowsConfig
        };

    }

}