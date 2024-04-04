import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {

    const router: Router = inject(Router);

    return inject(AuthService)
        .check()
        .pipe(
            switchMap((authenticated) => {

                if (!authenticated) {

                    router.navigate(["login"]);

                    return of(false);

                }

                return of(true);
            })
        );

};
