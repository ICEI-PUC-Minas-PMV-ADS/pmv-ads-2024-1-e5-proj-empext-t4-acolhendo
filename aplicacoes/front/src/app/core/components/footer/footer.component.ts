import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule]
})
export class FooterComponent {

    constructor() {
        
    }

}