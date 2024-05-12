import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { DirectivesModule } from '../../../shared/directives/directives.module';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterModule, DirectivesModule]
})
export class FooterComponent {

    constructor(
        private _authService: AuthService
    ) {
        
    }

    deslogar() {

        this._authService.signOut();

    }

}