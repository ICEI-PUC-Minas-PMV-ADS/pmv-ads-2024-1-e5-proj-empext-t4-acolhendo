import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor() {

    }

    public static moveScrollId(id: string, behavior: ScrollBehavior = 'smooth', block: ScrollLogicalPosition = 'start', time = 0) {

        setTimeout(() => {

            let el = document.getElementById(id);

            el?.scrollIntoView({
                behavior,
                block
            });

        }, time);

    }

    public static moveScrollTop() {

        setTimeout(() => {
            
            window.scrollTo(0, 0);
            
        });

    }

    public static validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {

        Object.keys(formGroup.controls).forEach((field) => {

            const control = formGroup.get(field);

            if (control instanceof UntypedFormControl) {

                control.markAsTouched({ onlySelf: true });

            } else if (
                control instanceof UntypedFormGroup ||
                control instanceof UntypedFormArray
            ) {

                this.validateAllFormFields(control);

            }

        });

    }

}