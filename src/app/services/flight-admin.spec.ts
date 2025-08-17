import { TestBed } from '@angular/core/testing';

import { FlightAdmin } from './flight-admin';

describe('FlightAdmin', () => {
  let service: FlightAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
