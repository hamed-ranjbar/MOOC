import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { MaterialExampleModule } from '../_helpers/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentBoxComponent } from './comment-box/comment-box.component';



@NgModule({
  declarations: [
    CommentComponent,
    CommentBoxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ],
  exports: [
    CommentComponent,
    CommentBoxComponent
  ]
})
export class CommentModule { }
