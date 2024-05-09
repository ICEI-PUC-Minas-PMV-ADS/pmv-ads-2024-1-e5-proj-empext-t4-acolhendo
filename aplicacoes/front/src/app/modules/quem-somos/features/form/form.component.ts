import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-quem-somos-form',
    templateUrl: './form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuemSomosFormComponent {

    constructor() { }

}