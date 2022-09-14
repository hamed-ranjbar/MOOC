import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramDetailComponent } from './program-detail.component';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MaterialExampleModule } from '../_helpers/material.module';


@NgModule({
  declarations: [
    ProgramDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialExampleModule
  ],
  exports: [
    ProgramDetailComponent
  ]
})
export class ProgramDetailModule { }
