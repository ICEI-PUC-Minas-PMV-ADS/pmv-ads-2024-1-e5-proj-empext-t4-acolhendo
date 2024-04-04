import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule]
})
export class MenuComponent {

    constructor() {
        
    }

}