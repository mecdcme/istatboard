import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstatPivotGridComponent } from './istat-pivot-grid.component';

describe('IstatPivotGridComponent', () => {
  let component: IstatPivotGridComponent;
  let fixture: ComponentFixture<IstatPivotGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatPivotGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatPivotGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
