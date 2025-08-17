import { TestBed } from '@angular/core/testing';

import { FareAdmin } from './fare-admin';

describe('FareAdmin', () => {
  let service: FareAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FareAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
