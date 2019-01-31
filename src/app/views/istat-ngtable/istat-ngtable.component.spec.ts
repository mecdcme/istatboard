import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstatNgtableComponent } from './istat-ngtable.component';

describe('IstatNgtableComponent', () => {
  let component: IstatNgtableComponent;
  let fixture: ComponentFixture<IstatNgtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatNgtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatNgtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
