import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-layout-default',
    templateUrl: './default.component.html',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent]
})
export class LayoutDefaultComponent {

    constructor() {

    }

}