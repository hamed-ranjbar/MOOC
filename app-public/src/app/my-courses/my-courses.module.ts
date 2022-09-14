import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from './my-courses.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MyCoursesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MyCoursesComponent
  ]
})
export class MyCoursesModule { }
