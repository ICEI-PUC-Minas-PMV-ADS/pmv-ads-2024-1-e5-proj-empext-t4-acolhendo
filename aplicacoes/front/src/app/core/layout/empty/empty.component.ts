import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout-empty',
    templateUrl: './empty.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class LayoutEmptyComponent {

    constructor() {

    }

}