import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackatonComponent } from './hackaton.component';

describe('HackatonComponent', () => {
  let component: HackatonComponent;
  let fixture: ComponentFixture<HackatonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackatonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackatonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
