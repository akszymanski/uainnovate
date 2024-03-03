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
  officeLocations = ['Birmingham', 'Montgomery', 'Huntsville', 'Troy', 'Mobile'];
  email = '';
  //result: any;
  data: any[] = [];
  fname = '';
  lname = '';
  phone1 = '';
  role1 = '';
  officelocations = '';
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
        console.log("data: ",this.data);
      });

      // this.http.get('http://localhost:5038/api/GetStudent/'+ this.email, this.jobApplicationForm.value)
      //   .subscribe(
      //     response => {
      //       console.log('Submission successful1:', response);
      //       //this.fname = response.firstName;
      //       // Optionally, reset the form after successful submission
      //       //this.jobApplicationForm.reset();
      //       const blob = new Blob([response], {type: 'application/json'})
      //       const reader = new FileReader();
      //       reader.readAsText(blob);
      //       reader.onloadend = () => {
      //         const result = JSON.parse(reader.result as string);
      //         console.log(result); // This will log the JSON object
      //       };
      //       //this.email = this.result.email;
      //       this.fname = this.result.firstName;
      //       this.lname = this.result.lastName;
      //       this.phone1 = this.result.phone;
      //       this.role1 = this.result.role;
      //       this.officelocations = this.result.officeLocations;
      //       this.resume1 = null; //FIXME
      //       this.graddate = this.result.graduationDate;
      //       this.university1 = this.result.university;
      //       this.linkedin1 = this.result.linkedin;
      //         //email: this.result.email;
      //         // Set other form fields here
            
            
      //   },
      //     error => {
      //       console.error('Error submitting application:', error);
      //     }
      //   )
   
      
    this.initForm();
  }

 

  private initForm(): void {
    this.jobApplicationForm = this.formBuilder.group({
      firstName: [this.fname, Validators.required],
      lastName: [this.lname, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      phone: [this.phone1, Validators.required],
      role: [this.role1, Validators.required],
      officeLocations: [this.officelocations],
      resume: [this.resume1, Validators.required],
      graduationDate: [this.graddate, Validators.required],
      university: [this.university1, Validators.required],
      linkedin: [this.linkedin1]
    });

    // onSubmit(): void {
    //   if (this.jobApplicationForm.valid) {
    //     // Send data to the server04 Not Fou
    //     this.http.post('http://localhost:5038/api/AddStudent', this.jobApplicationForm.value)
    //       .subscribe(
    //         response => {
    //           console.log('Submission successful:', response);
    //           // Optionally, reset the form after successful submission
    //           this.jobApplicationForm.reset();
    //         },
    //         error => {
    //           console.error('Error submitting application:', error);
    //         }
    //       );
    //   }
    // }
}
}
