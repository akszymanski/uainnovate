import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
// import express from 'express';
// const app = express();
// app.use(express.json());

@Component({
  selector: 'app-update-student',
  // standalone: true,
  // imports: [],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent {
  jobApplicationForm: FormGroup = {} as FormGroup;
  possibleLocations = ['Birmingham', 'Montgomery', 'Huntsville', 'Troy', 'Mobile'];
  email = '';
  //result: any;
  data: any = {};
  fname = '';
  lname = '';
  phone1 = '';
  role1 = '';
  officeLocations = '';
  resume1 = null;
  graddate = ''
  university1 = '';
  linkedin1 = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    //if (navigation && navigation.extras.state){
      const state = history.state as {email:string};
      this.email = state.email;
      console.log('test: ', state.email);
      this.http.get<any[]>('http://localhost:5038/api/GetStudent/'+ this.email).subscribe((response: any[]) => {
        this.data = response;
        if (Array.isArray(this.data) && this.data.length > 0) {
          this.fname = this.data[0].firstName;
          this.lname = this.data[0].lastName;
          this.phone1 = this.data[0].phone;
          this.role1 = this.data[0].role;
          this.officeLocations = this.data[0].officeLocations;
          this.resume1 = this.data[0].resume;
          this.graddate = this.data[0].graduationDate;
          this.university1 = this.data[0].university;
          this.linkedin1 = this.data[0].linkedin;
        } else if (this.data && typeof this.data === 'object') {
          this.fname = this.data.firstName;
          this.lname = this.data.lastName;
          this.phone1 = this.data.phone;
          this.role1 = this.data.role;
          this.officeLocations = this.data.officeLocations;
          this.resume1 = this.data.resume;
          this.graddate = this.data.graduationDate;
          this.university1 = this.data.university;
          this.linkedin1 = this.data.linkedin;
        } else {
          console.log('Data is not an array or an object');
        }
      });

      
  
   
      
    this.initForm();
  }

 

  private initForm(): void {
    this.jobApplicationForm = this.formBuilder.group({
      firstName: [this.fname, Validators.required],
      lastName: [this.lname, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      phone: [this.phone1, Validators.required],
      role: [this.role1, Validators.required],
      officeLocations: [this.officeLocations],
      resume: [this.resume1, Validators.required],
      graduationDate: [this.graddate, Validators.required],
      university: [this.university1, Validators.required],
      linkedin: [this.linkedin1]
    });


}
}
