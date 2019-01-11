import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstatContainerComponent } from './istat-container.component';

describe('IstatContainerComponent', () => {
  let component: IstatContainerComponent;
  let fixture: ComponentFixture<IstatContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
