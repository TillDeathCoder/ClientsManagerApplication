import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCloseComponent } from './operation-close.component';

describe('OperationCloseComponent', () => {
  let component: OperationCloseComponent;
  let fixture: ComponentFixture<OperationCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
