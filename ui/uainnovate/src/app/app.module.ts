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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent, // Add HomeComponent to imports
        SubmitStudentComponent,
        StudentComponent,
        StudentLoginComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule, 
        ReactiveFormsModule,// Use AppRoutingModule instead of RouterModule here
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
