import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FareService } from '../..//fare';

@Component({
  selector: 'app-fare',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <button (click)="calculate()" [disabled]="!ticketType || passengers < 1 || isLoading">
        {{ isLoading ? 'Calculating…' : 'Calculate Fare' }}
      </button>

      <p *ngIf="unitFare && totalFare">Unit: ₹{{ unitFare }} | Total: ₹{{ totalFare }}</p>
      <p *ngIf="error" class="error">{{ error }}</p>
    </div>
  `,
  styles: [`.error { color: red; font-weight: bold; margin-top: 0.5rem; }`]
})
export class FareComponent {
  @Input() flightNumber!: string;
  @Input() ticketType: string = '';
  @Input() passengers: number = 1;

  @Output() totalCalculated = new EventEmitter<number>();

  unitFare = 0;
  totalFare = 0;
  isLoading = false;
  error = '';

  constructor(private fareSvc: FareService) {}

  calculate(): void {
    if (!this.flightNumber || !this.ticketType || this.passengers < 1) {
      this.error = 'Select class & passengers first';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.fareSvc.getUnitFare(this.flightNumber, this.ticketType).subscribe({
      next: (price: number) => {
        this.unitFare = price;
        this.totalFare = Math.round(price * this.passengers);
        this.totalCalculated.emit(this.totalFare);
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Could not fetch fare – try again';
        this.totalFare = 0;
        this.totalCalculated.emit(0);
        this.isLoading = false;
      }
    });
  }
}
