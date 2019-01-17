import { TestBed } from '@angular/core/testing';

import { IstatServiceService } from './istat-service.service';

describe('IstatServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IstatServiceService = TestBed.get(IstatServiceService);
    expect(service).toBeTruthy();
  });
});
