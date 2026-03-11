import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskColumnComponent } from './task-column.component';

describe('TaskColumnComponent', () => {
  let component: TaskColumnComponent;
  let fixture: ComponentFixture<TaskColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskColumnComponent]
    });
    fixture = TestBed.createComponent(TaskColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
