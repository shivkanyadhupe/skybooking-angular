// ────────────────────────────────────────────────────────────────
// File: src/app/components/fare/fare.spec.ts
// ────────────────────────────────────────────────────────────────
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of }                         from 'rxjs';

/* component under test (stand‑alone) */
import { FareComponent }              from './fare';

/* dependency to be mocked */
import { FareService }                from '../../fare';

/* 🔹 mock service that always returns ₹5 000 */
class MockFareService {
  getUnitFare = jasmine
    .createSpy('getUnitFare')
    .and.returnValue(of(5_000));
}

describe('FareComponent', () => {
  let fixture  : ComponentFixture<FareComponent>;
  let component: FareComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      /* stand‑alone component goes in the imports array */
      imports  : [FareComponent],
      providers: [
        { provide: FareService, useClass: MockFareService }   // ← use mock
      ]
    }).compileComponents();

    fixture   = TestBed.createComponent(FareComponent);
    component = fixture.componentInstance;

    /* supply @Input()s that <app‑booking> would normally bind */
    component.flightNumber = 'AI101';
    component.ticketType   = 'BUSINESS';
    component.passengers   = 2;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total fare using FareService', () => {
    component.calculate();        // 🔸 triggers the mock service
    fixture.detectChanges();

    expect(component.unitFare).toBe(5_000);
    expect(component.totalFare).toBe(10_000);   // 2 × 5 000

    /* verify service interaction */
    const mockSvc = TestBed.inject(FareService) as unknown as MockFareService;
    expect(mockSvc.getUnitFare).toHaveBeenCalledWith('AI101', 'BUSINESS');
  });
});
