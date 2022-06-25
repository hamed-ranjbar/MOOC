import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProgramsModule } from './programs/programs.module';
import { ContactModule } from './contact/contact.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HtmlLineBreakPipe } from './html-line-break.pipe';
import { ProgramDetailModule } from './program-detail/program-detail.module';

@NgModule({
  declarations: [
    AppComponent,
    HtmlLineBreakPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ProgramsModule,
    ProgramDetailModule,
    ContactModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
