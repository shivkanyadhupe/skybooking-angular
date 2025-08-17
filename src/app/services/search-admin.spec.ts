import { TestBed } from '@angular/core/testing';

import { SearchAdmin } from './search-admin';

describe('SearchAdmin', () => {
  let service: SearchAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
