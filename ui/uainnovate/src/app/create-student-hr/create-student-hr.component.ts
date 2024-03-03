import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({ 
 selector: 'app-create-student-hr',
 //standalone: true,
 //imports: [],
 templateUrl: './create-student-hr.component.html',
 styleUrl: './create-student-hr.component.css'
})
export class CreateStudentHRComponent {
 jobApplicationForm: FormGroup = {} as FormGroup;
 officeLocations = ['Birmingham', 'Montgomery', 'Huntsville', 'Troy', 'Mobile'];
 resumeFile: any;
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
     role: ['', Validators.required],
     officeLocations: [''],
     resume: ['', Validators.required],
     graduationDate: ['', Validators.required],
     university: ['', Validators.required],
     linkedin: [''],
     interviewStage: [''],
     interviewFeedback: ['',Validators.required],
     evaluationMetric: ['',Validators.required],
   });
 }

 onFileChange(event: Event): void {
     const target = event.target as HTMLInputElement;
     if (target.files && target.files.length > 0) {
       this.resumeFile = target.files[0];
     }
 }

 onSubmit(): void {
   console.log("onsubmit");
   if (this.jobApplicationForm.valid) {

     const formData = new FormData();

     // Append all form values to formData
     for (const key in this.jobApplicationForm.value) {
       formData.append(key, this.jobApplicationForm.value[key]);
     }

     console.log("here");

     // Append the file to formData
     // Assume the file is stored in this.resumeFile
     formData.append('resume', this.resumeFile);

     // Send data to the server04 Not Fou
     console.log("here2");
     this.http.post('http://localhost:5038/api/AddStudentHR', formData)
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
   else{
     console.log("Invalid form");
   }
 }
}

