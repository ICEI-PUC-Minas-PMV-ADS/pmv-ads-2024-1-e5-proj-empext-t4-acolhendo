import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe, registerLocaleData } from '@angular/common';
import { APP_INITIALIZER, ApplicationConfig, Injector, LOCALE_ID } from '@angular/core';
import localePtBr from '@angular/common/locales/pt';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatTabsConfig, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import Quill from 'quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';

import { appRoutes } from './app.routes';
import { getPortuguesePaginatorIntl } from './core/uteis/portuguese-paginator';
import { AuthService } from './core/services/auth.service';
import { httpInterceptor } from './core/services/httpstatus.service';
import { ApiService } from './core/services/api.service';

// ANGULAR LOCALE
registerLocaleData(localePtBr, 'pt');

// FORMATO DATA
const MY_DATE_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

// ANGULAR TOOLTIP
const customTooltipDefaults: MatTooltipDefaultOptions = {
    showDelay: 1000,
    hideDelay: 0,
    touchendHideDelay: 0
}

// ANGULAR MATERIAL TAB
const customTabDefaults: MatTabsConfig = {
    animationDuration: '300ms',
    preserveContent: true
}

// FORM FIELD CONFIG
const MatFormFieldAppearance: MatFormFieldDefaultOptions = {
    appearance: 'outline'
};

// QUILL EDITOR - REGISTER
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

export const appConfig: ApplicationConfig = {
    providers: [
        AuthService,
        {
            provide: APP_INITIALIZER,
            useFactory: AuthService.initApp,
            multi: true,
            deps: [Injector, AuthService, ApiService],
        },
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })),
        provideAnimations(),
        provideHttpClient(withInterceptors([httpInterceptor])),
        { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
        PercentPipe,
        CurrencyPipe,
        DecimalPipe,
        DatePipe,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults },
        { provide: MAT_TABS_CONFIG, useValue: customTabDefaults },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: MatFormFieldAppearance }
    ]
};
