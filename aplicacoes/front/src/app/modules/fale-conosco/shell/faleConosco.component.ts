import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UntypedFormControl } from '@angular/forms';
import { Subject, finalize, merge, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-artigoT',
  templateUrl: './faleConosco.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class FaleConoscoComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor() { }

  sendEmail() {
    
    const subject = 'Submissão de formulário';
    const body = `Nome: ${this.formData.name}%0D%0A` +
                 `Email: ${this.formData.email}%0D%0A` +
                 `Mensagem: ${this.formData.message}`;
    const mailtoLink = `mailto:joaovictorlessa98@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  }
}
