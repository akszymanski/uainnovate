import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SubmitStudentComponent } from './submit-student/submit-student.component';
import { StudentComponent } from './student/student.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { HrModule } from './hr/hr.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateStudentHRComponent } from './create-student-hr/create-student-hr.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent, // Add HomeComponent to imports
        SubmitStudentComponent,
        StudentComponent,
        StudentLoginComponent,
        UpdateStudentComponent,
        CreateStudentHRComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        HttpClientModule,
        AppRoutingModule, 
        ReactiveFormsModule,// Use AppRoutingModule instead of RouterModule here
        HrModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
