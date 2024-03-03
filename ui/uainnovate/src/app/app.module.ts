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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SubmitStudentComponent,
        StudentComponent,
        StudentLoginComponent,
        UpdateStudentComponent,
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
