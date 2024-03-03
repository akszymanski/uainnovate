import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router from @angular/router

@Component({
  selector: 'app-submit-student',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  jobApplicationForm: FormGroup = {} as FormGroup;
  officeLocations = ['Location 1', 'Location 2', 'Location 3', 'Location 4'];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.jobApplicationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    console.log("onsubmit");
    if (this.jobApplicationForm.valid) {
      // Send data to the server
      console.log(this.jobApplicationForm.value);
      this.http.get('http://localhost:5038/api/GetStudent/' + this.jobApplicationForm.value.email, this.jobApplicationForm.value)
        .subscribe(
          response => {
            console.log('Submission successful:', response);

            if(response != null){
              this.router.navigate(['/update-student'], { state: { email: this.jobApplicationForm.value.email } });
            }


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
