import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class LoginService {

    constructor(
        private _api: ApiService
    ) {

    }

}