import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstatMapsComponent } from './istat-maps.component';

describe('IstatMapsComponent', () => {
  let component: IstatMapsComponent;
  let fixture: ComponentFixture<IstatMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
