import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ProgramCardComponent } from './program-card/program-card.component';
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FooterComponent,
    ProgramCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    ProgramCardComponent
  ]
})
export class SharedModule { }
