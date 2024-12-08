import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentHRComponent } from './create-student-hr.component';

describe('CreateStudentHRComponent', () => {
  let component: CreateStudentHRComponent;
  let fixture: ComponentFixture<CreateStudentHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStudentHRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStudentHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
