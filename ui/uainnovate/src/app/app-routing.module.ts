import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Import HomeComponent
import { StudentComponent } from './student/student.component';
import { HrComponent } from './hr/hr.component';
import { SubmitStudentComponent } from './submit-student/submit-student.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home page by default
  { path: 'student', component: StudentComponent },
  { path: 'hr', component: HrComponent },
  { path: 'submit-student', component: SubmitStudentComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }