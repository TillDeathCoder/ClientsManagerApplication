import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticYearComponent } from './statistic-year.component';

describe('StatisticYearComponent', () => {
  let component: StatisticYearComponent;
  let fixture: ComponentFixture<StatisticYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
