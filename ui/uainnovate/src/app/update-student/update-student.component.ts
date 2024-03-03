import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }
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
  private getInfo(): void {
    if (this.jobApplicationForm.valid){
      this.http.get('http://localhost:5038/api/GetStudent/'+ this.email, this.jobApplicationForm.value)
        .subscribe(
          response => {
            console.log('Submission successful:', response);
            // Optionally, reset the form after successful submission
            this.jobApplicationForm.reset();
          },
          error => {
            console.error('Error submitting application:', error);
          }
        )
      
    }
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
