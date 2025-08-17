import { TestBed } from '@angular/core/testing';

import { BookingAdmin } from './booking-admin';

describe('BookingAdmin', () => {
  let service: BookingAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
