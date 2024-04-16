import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'html-no-css',
    templateUrl: './html-no-css.html',
    encapsulation: ViewEncapsulation.ShadowDom,
    standalone: true
})
export class HTMLNoCssComponent {

    @Input() texto: string = '';

    constructor() {

    }

}