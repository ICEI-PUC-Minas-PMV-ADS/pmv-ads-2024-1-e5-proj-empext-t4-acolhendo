import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UtilsService } from '../../../../core/services/utils.service';
import { EmpresaService } from '../../data-access/empresa.service';
import { Masks } from '../../../../core/uteis/masks.utils';
import { UtilsValidators } from '../../../../core/uteis/validators.utils';

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpresaComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    formDados: UntypedFormGroup = new UntypedFormGroup({});

    empresa: any;

    loading: boolean = false;

    fone9Mask = Masks.fone9Mask;
    cpfcnpjMask = Masks.cpfcnpjMask;

    constructor(
        private _empresaService: EmpresaService,
        private _formBuilder: UntypedFormBuilder,
        private _cd: ChangeDetectorRef,
        private _router: Router
    ) {

        this.formDados = this._formBuilder.group({
            id: [null, []],
            email: [null, [Validators.required, UtilsValidators.validatorEmail]],
            telefone: [null, []],
            instagram: [null, []],
            facebook: [null, []],
            youtube: [null, []],
            // chave_pix: [null, []],
            // banco: [null, []],
            // agencia: [null, []],
            // conta: [null, []],
            // cnpj: [null, [UtilsValidators.validatorCpfCnpj]],
            // nome: [null, []],
        });

    }

    ngOnInit(): void {

        this.getDados();

    }

    ngOnDestroy() {

        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

    }

    getDados() {

        this.loading = true;
        this._cd.detectChanges();

        this._empresaService.getCompany()
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges(); })
            )
            .subscribe({
                next: res => {

                    this.editar(res);

                },
                error: err => {

                    this._router.navigateByUrl('/')

                }
            });

    }

    editar(dados: any) {

        this.empresa = dados;

        this.formDados.patchValue(this.empresa);

        this._cd.detectChanges();

    }

    async salvar() {

        if (this.formDados.invalid) {
            UtilsService.validateAllFormFields(this.formDados);
            return;
        }

        this.loading = true;
        this._cd.detectChanges();

        const values = this.formDados.value;

        this._empresaService.salvarEmpresa(values)
            .pipe(
                takeUntil(this._unsubscribeAll),
                finalize(() => { this.loading = false; this._cd.detectChanges(); })
            )
            .subscribe({
                next: res => {

                    // this._dialog.showToast('Dados salvos com sucesso');

                },
                error: err => {
                    // this._dialog.error(err, 'Erro ao atualizar dados');
                }
            });

    }

}