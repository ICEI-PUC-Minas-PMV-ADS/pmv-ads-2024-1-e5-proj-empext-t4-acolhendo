import { Injectable, EventEmitter, inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class HTTPStatus {

    private static requestsRunning$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private static requestInFlight$: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    setHttpStatus(inFlight: boolean, uuid: string) {

        let reqs = HTTPStatus.requestsRunning$.value || [];

        if (inFlight) {
            reqs.push(uuid);
        } else {
            reqs = reqs.filter((r: string) => r != uuid);
        }

        HTTPStatus.requestsRunning$.next(reqs);
        HTTPStatus.requestInFlight$.emit(!!reqs?.length);

    }

    getHttpStatus(): EventEmitter<boolean> {
        return HTTPStatus.requestInFlight$;
    }

}

@Injectable({ providedIn: 'root' })
export class HTTPListener {

    static disableNextRequest: boolean = false;

}

export const httpInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

    const _status = inject(HTTPStatus);
    const _router = inject(Router);
    const _authService = inject(AuthService);

    const uuid = uuidv4();

    if (HTTPListener.disableNextRequest) {
        HTTPListener.disableNextRequest = false;
        return next(req)
            .pipe(
                catchError((error) => {

                    if (error?.status === 401) {
                        if (_authService) {
                            _authService.signOut();
                        }

                        _router.navigate(['login']);
                    }

                    return throwError(error);

                })
            );
    }

    return next(req)
        .pipe(
            map((event) => {
                _status.setHttpStatus(true, uuid);
                return event;
            }),
            catchError((error) => {

                if (error?.status === 401) {
                    if (_authService) {
                        _authService.signOut();
                    }

                    _router.navigate(['login']);
                }

                return throwError(error);

            }),
            finalize(() => {
                _status.setHttpStatus(false, uuid);
            })
        );

};