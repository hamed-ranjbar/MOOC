import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateComponent } from './certificate/certificate.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CertificateComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CertificateComponent
  ]
})
export class CertificateModule { }
