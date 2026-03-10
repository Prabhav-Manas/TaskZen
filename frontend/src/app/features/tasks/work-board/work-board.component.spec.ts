import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkBoardComponent } from './work-board.component';

describe('WorkBoardComponent', () => {
  let component: WorkBoardComponent;
  let fixture: ComponentFixture<WorkBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkBoardComponent]
    });
    fixture = TestBed.createComponent(WorkBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
