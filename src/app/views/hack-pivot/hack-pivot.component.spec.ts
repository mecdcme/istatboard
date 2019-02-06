import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackPivotComponent } from './hack-pivot.component';

describe('HackPivotComponent', () => {
  let component: HackPivotComponent;
  let fixture: ComponentFixture<HackPivotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackPivotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackPivotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
