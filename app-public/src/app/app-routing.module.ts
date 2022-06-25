import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { ProgramsComponent } from './programs/programs.component';

const routes: Routes = [
  { path: 'programs', component: ProgramsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'program/:programId', component: ProgramDetailComponent },
  { path: '', pathMatch: 'full', redirectTo: '/programs' },
  { path: '**', redirectTo: '/programs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
