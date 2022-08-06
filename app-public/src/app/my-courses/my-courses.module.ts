import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesComponent } from './my-courses.component';



@NgModule({
  declarations: [
    MyCoursesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyCoursesComponent
  ]
})
export class MyCoursesModule { }
