import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartDetailComponent } from './part-detail/part-detail.component';



@NgModule({
  declarations: [
    PartDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PartDetailComponent
  ]
})
export class PartDetailModule { }
