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
import { ProgramDetailModule } from './program-detail/program-detail.module';
import { CourseDetailModule } from './course-detail/course-detail.module';
import { MaterialDetailModule } from './material-detail/material-detail.module';
import { CertificateModule } from './certificate/certificate.module';
import { FavoriteModule } from './favorite/favorite.module';
import { MyCoursesModule } from './my-courses/my-courses.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ProgramsModule,
    ProgramDetailModule,
    CourseDetailModule,
    ContactModule,
    BrowserAnimationsModule,
    MaterialDetailModule,
    CertificateModule,
    FavoriteModule,
    MyCoursesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
