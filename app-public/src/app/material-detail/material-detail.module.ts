import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDetailComponent } from './material-detail.component';
import { MaterialContentComponent } from './material-content/material-content.component';
import { HtmlLineBreakPipe } from '../html-line-break.pipe';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MaterialDetailComponent,
    MaterialContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MaterialDetailComponent,
    MaterialContentComponent
  ]
})
export class MaterialDetailModule { }
