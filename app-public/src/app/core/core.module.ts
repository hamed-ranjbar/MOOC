import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from '../material.module'

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule
  ],
  exports: [
    HeaderComponent,
    LoginComponent
  ]
})
export class CoreModule { }
