import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Form, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css'],
})
export class HrComponent implements OnInit {
  itemForm: FormGroup = {} as FormGroup;
  data: any[] = [];
  searchQuery: string = '';
  showForm = false;
  possibleLocations = ['Birmingham', 'Montgomery', 'Huntsville', 'Troy', 'Mobile', 'Location1', 'Location2', 'Location3', 'Location4', 'Location5'];

  constructor(private http: HttpClient) {
    this.itemForm = new FormGroup({
      'firstName': new FormControl({value: '', disabled: true}),
      'lastName': new FormControl({value: '', disabled: true}),
      'email': new FormControl({value: '', disabled: true}),
      'phone': new FormControl({value: '', disabled: true}),
      'linkedin': new FormControl({value: '', disabled: true}),
      'graduationDate': new FormControl({value: '', disabled: true}),
      'university': new FormControl({value: '', disabled: true}),
      'role': new FormControl({value: '', disabled: true}),
      'locations': new FormControl({value: '', disabled: true}),
      'resume': new FormControl({value: '', disabled: true}),
      'interviewStage': new FormControl({value: '', disabled: true}),
      'interviewFeedback': new FormControl({value: '', disabled: true}),
      'evaluation': new FormControl({value: '', disabled: true}),
    });
   }

  onSearch(): void {
    let trimmedQuery: string = this.searchQuery.trim();
    let firstName: string = trimmedQuery.split(' ')[0];
    let lastName: string = trimmedQuery.split(' ')[1];

    if (lastName == null){
      this.http.get(`http://localhost:5038/api/SearchStudents/${firstName}/null`).subscribe((response: Object) => {
      this.data = response as any[];
    });
    } else {
      this.http.get(`http://localhost:5038/api/SearchStudents/${firstName}/${lastName}`).subscribe((response: Object) => {
      this.data = response as any[];
    });
    }
    
  }

  resetTable(): void {
    this.http.get<any[]>('http://localhost:5038/api/GetData').subscribe((response: any[]) => {
      this.data = response;
    });
    this.searchQuery = ' ';
  }

  viewItem(item: any): void {
    this.showForm = true;
    this.itemForm.patchValue({
      'firstName': item.firstName,
      'lastName': item.lastName,
      'email': item._id,
      'phone': item.phone,
      'linkedin': item.linkedin,
      'graduationDate': item.graduationDate,
      'university': item.university,
      'role': item.role,
      'locations': item.officeLocations,
      'resume': item.resume,
      'interviewStage:': item.interviewStage,
      'interviewFeedback': item.interviewFeedback,
      'evaluation': item.evaluationMetric,
    });
  }

  isEditMode = false;

// ...

updateItem() {
  // Enable all form controls
  Object.keys(this.itemForm.controls).forEach(controlName => {
    this.itemForm.get(controlName)?.enable();
  });
  
  // Set edit mode to true
  this.isEditMode = true;
}

submitChanges() {
  // Perform your update logic here

  // Disable form controls after submitting changes
  Object.keys(this.itemForm.controls).forEach(controlName => {
    this.itemForm.get(controlName)?.disable();
  });

  // Set edit mode to false
  this.isEditMode = false;
}

  deleteSelected(): void {
    const selectedItems = this.data.filter(item => item.selected);
    const deleteRequests = selectedItems.map(item =>
      this.http.post('http://localhost:5038/api/DeleteStudent', { _id : item._id })
    );
    

    forkJoin(deleteRequests).subscribe(() => {
      this.data = this.data.filter(item => !item.selected);
      this.resetTable();
    });
  }

  ngOnInit(): void {
    this.resetTable();
  }
}
