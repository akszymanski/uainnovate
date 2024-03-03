import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

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
  resumeLink: any;

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
    this.initForm();
    this.getInfo();
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
    console.log("getInfo");
    var pdflink: any;
    this.http.get('http://localhost:5038/api/GetStudent/'+ this.email, { responseType: 'json' })
      .subscribe(
        (response: any) => {
          console.log('Submission successful:', response);
          
          this.fname = response.firstName;
          this.lname = response.lastName;
          this.phone1 = response.phone;
          this.role1 = response.role;
          this.officeLocations = response.officeLocations;
          this.resume1 = response.resume;
          this.graddate = response.graduationDate;
          this.university1 = response.university;
          this.linkedin1 = response.linkedin;
          
          this.http.get('http://localhost:5038/api/GetStudentFile/' + this.email, { responseType: 'blob' })
        .subscribe(
          file => {
            console.log('Received file:', file);

            // Handle the file
            let url = URL.createObjectURL(file);
            let link = document.createElement('a');
            link.href = url;
            link.download = `${this.email}.pdf`;
            pdflink = link;
            this.resumeLink = pdflink;
            //link.click();

            console.log('Resume link:', pdflink); // Log the generated link

            this.jobApplicationForm.patchValue({
              'resume': pdflink,
            });

            },
            error => {
              console.error('Error getting file:', error);
            }
          );
          },
          error => {
            console.error('Error submitting application:', error);
          }
        )
      
    
    
    
  }

downloadResume(): void {
  if (this.resumeLink) {
      this.resumeLink.click();
  }
}

  private initForm(): void {
    this.jobApplicationForm = this.formBuilder.group({
      firstName: [this.fname, Validators.required],
      lastName: [this.lname, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      phone: [this.phone1, Validators.required],
      officeLocations: [this.officeLocations],
      resume: [this.resume1, Validators.required],
      graduationDate: [this.graddate],
      university: [this.university1, Validators.required],
      linkedin: [this.linkedin1]
    });


}

 onSubmit(): void {
      console.log("onsubmit");
      if (this.jobApplicationForm.valid) {
        // Send data to the server04 Not Fou
        this.http.post('http://localhost:5038/api/UpdateStudent', this.jobApplicationForm.value)
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
        Object.keys(this.jobApplicationForm.controls).forEach(key => {
          const controlErrors: ValidationErrors | null = this.jobApplicationForm.get(key)?.errors || null;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });
      }
    }


}
