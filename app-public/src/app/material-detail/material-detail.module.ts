import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDetailComponent } from './material-detail.component';
import { MaterialContentComponent } from './material-content/material-content.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MaterialDetailComponent,
    MaterialContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports: [
    MaterialDetailComponent,
    MaterialContentComponent
  ]
})
export class MaterialDetailModule { }
