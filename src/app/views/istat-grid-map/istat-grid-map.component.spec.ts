import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstatGridMapComponent } from './istat-grid-map.component';

describe('IstatGridMapComponent', () => {
  let component: IstatGridMapComponent;
  let fixture: ComponentFixture<IstatGridMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatGridMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatGridMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
