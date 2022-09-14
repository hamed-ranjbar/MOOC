import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialExampleModule } from '../_helpers/material.module';
import { CommentModule } from '../comment/comment.module';

@NgModule({
  declarations: [
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CommentModule,
    MaterialExampleModule
  ],
  exports: [
    CourseDetailComponent
  ]
})
export class CourseDetailModule { }
