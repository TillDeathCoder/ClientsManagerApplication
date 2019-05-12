import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsCalendarComponent } from './operations-calendar.component';

describe('OperationsCalendarComponent', () => {
  let component: OperationsCalendarComponent;
  let fixture: ComponentFixture<OperationsCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
