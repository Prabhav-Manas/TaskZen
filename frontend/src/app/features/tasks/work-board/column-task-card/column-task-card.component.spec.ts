import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTaskCardComponent } from './column-task-card.component';

describe('ColumnTaskCardComponent', () => {
  let component: ColumnTaskCardComponent;
  let fixture: ComponentFixture<ColumnTaskCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnTaskCardComponent]
    });
    fixture = TestBed.createComponent(ColumnTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
