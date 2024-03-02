import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitStudentComponent } from './submit-student.component';

describe('SubmitStudentComponent', () => {
  let component: SubmitStudentComponent;
  let fixture: ComponentFixture<SubmitStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
