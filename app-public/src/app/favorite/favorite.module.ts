import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    FavoriteComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FavoriteComponent
  ]
})
export class FavoriteModule { }
