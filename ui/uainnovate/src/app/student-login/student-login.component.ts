import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-submit-student',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  jobApplicationForm: FormGroup = {} as FormGroup;
  officeLocations = ['Location 1', 'Location 2', 'Location 3', 'Location 4'];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.jobApplicationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.jobApplicationForm.valid) {
      // Send data to the server
      this.http.post('http://localhost:5038/api/GetStudent', this.jobApplicationForm.value)
        .subscribe(
          response => {
            console.log('Submission successful:', response);
            // Optionally, reset the form after successful submission
            this.jobApplicationForm.reset();
          },
          error => {
            console.error('Error submitting application:', error);
          }
        );
    }
  }
}
