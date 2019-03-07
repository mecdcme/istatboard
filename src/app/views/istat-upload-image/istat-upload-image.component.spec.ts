import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IstatUploadImageComponent } from './istat-upload-image.component';

describe('IstatUploadImageComponent', () => {
  let component: IstatUploadImageComponent;
  let fixture: ComponentFixture<IstatUploadImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IstatUploadImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IstatUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
