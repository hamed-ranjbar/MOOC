import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ProgramCardComponent } from './program-card/program-card.component';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from './page-title/page-title.component';
import { InstitutionInfoComponent } from './institution-info/institution-info.component';
import { HtmlLineBreakPipe } from '../html-line-break.pipe';
import { LecturerInfoComponent } from './lecturer-info/lecturer-info.component';
import { TableOfContentComponent } from './table-of-content/table-of-content.component';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    FooterComponent,
    ProgramCardComponent,
    PageTitleComponent,
    InstitutionInfoComponent,
    HtmlLineBreakPipe,
    LecturerInfoComponent,
    TableOfContentComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatStepperModule
  ],
  exports: [
    FooterComponent,
    ProgramCardComponent,
    PageTitleComponent,
    InstitutionInfoComponent,
    HtmlLineBreakPipe,
    LecturerInfoComponent,
    TableOfContentComponent
  ]
})
export class SharedModule { }
