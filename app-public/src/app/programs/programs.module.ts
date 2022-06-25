import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsComponent } from './programs.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProgramsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ProgramsComponent
  ]
})
export class ProgramsModule { }
