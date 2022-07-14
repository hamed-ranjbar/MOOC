import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateComponent } from './certificate/certificate/certificate.component';
import { ContactComponent } from './contact/contact.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { ProgramsComponent } from './programs/programs.component';

const routes: Routes = [
  { path: 'programs', component: ProgramsComponent },
  { path: 'program/:programId', component: ProgramDetailComponent },
  { path: 'course/:courseId', component: CourseDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'material/:courseId', component: MaterialDetailComponent },
  { path: 'certificate', component: CertificateComponent },
  { path: '', pathMatch: 'full', redirectTo: '/programs' },
  { path: '**', redirectTo: '/programs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
