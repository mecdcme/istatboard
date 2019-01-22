import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstatKendouiComponent } from './istat-kendoui.component';

describe('IstatKendouiComponent', () => {
  let component: IstatKendouiComponent;
  let fixture: ComponentFixture<IstatKendouiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatKendouiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatKendouiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
