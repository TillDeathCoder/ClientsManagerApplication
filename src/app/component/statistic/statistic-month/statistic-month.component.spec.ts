import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticMonthComponent } from './statistic-month.component';

describe('StatisticMonthComponent', () => {
  let component: StatisticMonthComponent;
  let fixture: ComponentFixture<StatisticMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
