import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstatMapLeaftComponent } from './istat-map-leaft.component';

describe('IstatMapLeaftComponent', () => {
  let component: IstatMapLeaftComponent;
  let fixture: ComponentFixture<IstatMapLeaftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatMapLeaftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatMapLeaftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
