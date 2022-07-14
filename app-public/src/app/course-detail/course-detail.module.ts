import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [
    CourseDetailComponent
  ]
})
export class CourseDetailModule { }
