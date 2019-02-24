import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LealeftMapComponent } from './lealeft-map.component';

describe('LealeftMapComponent', () => {
  let component: LealeftMapComponent;
  let fixture: ComponentFixture<LealeftMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LealeftMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LealeftMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
