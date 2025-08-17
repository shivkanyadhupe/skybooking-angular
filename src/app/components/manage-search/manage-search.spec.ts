import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSearch } from './manage-search';

describe('ManageSearch', () => {
  let component: ManageSearch;
  let fixture: ComponentFixture<ManageSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
