import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UtilsService } from '../../../../core/services/utils.service';
import { EmpresaService } from '../../data-access/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpresaComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  formDados: UntypedFormGroup = new UntypedFormGroup({});

  empresa: any;
  empresaId: number | null = null;
  loading: boolean = false;
  editMode: boolean = false;

  constructor(
    private _empresaService: EmpresaService,
    private _formBuilder: UntypedFormBuilder,
    private _cd: ChangeDetectorRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.formDados = this._formBuilder.group({
      id: [null, []],
      titulo: [null, [Validators.required]],
      email: [null, [Validators.email]],
      telefone: [null, [Validators.minLength(11), Validators.maxLength(14)]],
      instagram: [null, [Validators.pattern(/^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9-_]+$/)]],
      facebook: [null, [Validators.pattern(/^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9-_]+$/)]],
      youtube: [null, [Validators.pattern(/^(https?:\/\/)?(www\.)?youtube\.com\/[A-Za-z0-9-_]+$/)]],
      chave_pix: [null, []],
      banco: [null, []],
      agencia: [null, []],
      conta: [null, []],
      cnpj: [null, []],
      nome: [null, []],
    });

    this.getDados();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getDados() {
    if (this.empresaId) {
      this.loading = true;
      this._cd.detectChanges();

      this._empresaService.getCompany(this.empresaId)
        .pipe(
          takeUntil(this._unsubscribeAll),
          finalize(() => { this.loading = false; this._cd.detectChanges(); })
        )
        .subscribe({
          next: res => {
            this.editar(res);
          },
          error: err => {
            this.voltar();
          }
        });
    }
  }

  editar(dados: any) {
    this.empresa = dados;
    this.formDados.patchValue(this.empresa);
    this.editMode = true;
    this._cd.detectChanges();
  }

  voltar() {
    this._router.navigate(['/company']);
  }

  async salvar() {
    if (this.formDados.invalid) {
      UtilsService.validateAllFormFields(this.formDados);
      return;
    }

    this.loading = true;
    this._cd.detectChanges();

    const values = this.formDados.value;

    this._empresaService.salvarEmpresa(values, this.empresaId)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => { this.loading = false; this._cd.detectChanges(); })
      )
      .subscribe({
        next: res => {
          this.recarregar(this.empresaId || res.id);
          // this._dialog.showToast('Registro salvo com sucesso!', 'OK');
        },
        error: err => {
          // this._dialog.error(err, 'Erro ao atualizar dados');
        }
      });
  }

  recarregar(id: number) {
    if (!this.empresaId) {
      this._router.navigate(['/company']);
    }
    this.getDados();
  }
}
