// src/app/components/admin/manage-fares/manage-fares.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFaresComponent } from './manage-fares';

describe('ManageFaresComponent', () => {
  let component: ManageFaresComponent;
  let fixture: ComponentFixture<ManageFaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFaresComponent],        // ✅ standalone component import
    }).compileComponents();

    fixture = TestBed.createComponent(ManageFaresComponent); // ✅ use correct class
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
