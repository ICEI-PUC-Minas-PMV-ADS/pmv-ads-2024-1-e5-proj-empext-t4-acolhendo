import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
    selector: 'app-layout-default',
    templateUrl: './default.component.html',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent, MenuComponent]
})
export class LayoutDefaultComponent {

    constructor() {

    }

}