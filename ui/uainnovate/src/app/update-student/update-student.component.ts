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
  officeLocations = ['Location 1', 'Location 2', 'Location 3', 'Location 4'];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.jobApplicationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['Full-Time', Validators.required],
      officeLocations: [''],
      resume: [null, Validators.required],
      graduationDate: ['', Validators.required],
      university: ['', Validators.required],
      linkedin: ['']
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
