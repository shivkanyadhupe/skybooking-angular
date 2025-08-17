import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FlightService } from '../../services/flight';
import type {
  Flight,
  FlightSearchRequest
} from '../../models/flight.model';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <h2>Find Your Flight</h2>

      <form (ngSubmit)="searchFlights()" class="form">
        <input type="text" placeholder="Source Airport" [(ngModel)]="searchRequest.source" name="source" required />
        <input type="text" placeholder="Destination Airport" [(ngModel)]="searchRequest.destination" name="destination" required />
        <input type="date" [(ngModel)]="searchRequest.departureDate" name="departureDate" required />

        <button type="submit" [disabled]="isLoading">
          {{ isLoading ? 'Searching…' : 'Search Flights' }}
        </button>
      </form>

      <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>

      <div *ngIf="flights.length > 0" class="results">
        <div *ngFor="let flight of flights" class="flight-card">
          <h3>{{ flight.airline }} – {{ flight.flightNumber }}</h3>
          <p><strong>From:</strong> {{ flight.source }} | <strong>To:</strong> {{ flight.destination }}</p>
          <p><strong>Departure:</strong> {{ flight.departureTime }} | <strong>Arrival:</strong> {{ flight.arrivalTime }}</p>
          <button
            *ngIf="flight.id !== undefined"
            (click)="bookNow(flight.id!)">
            Book Now
          </button>
        </div>
      </div>

      <p *ngIf="!isLoading && flights.length === 0 && !errorMessage">No results yet. Search to see flights.</p>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 700px;
      margin: 2rem auto;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    h2 {
      text-align: center;
      margin-bottom: 1rem;
      color: #333;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    input {
      padding: 0.6rem;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }

    button {
      padding: 0.6rem;
      font-size: 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }

    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .error {
      color: red;
      margin-top: 1rem;
      font-weight: 500;
      text-align: center;
    }

    .results {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .flight-card {
      padding: 1rem;
      border-radius: 10px;
      background-color: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    .flight-card h3 {
      margin-bottom: 0.5rem;
      color: #222;
    }

    .flight-card p {
      margin: 0.3rem 0;
    }

    .flight-card button {
      margin-top: 0.8rem;
      background-color: #28a745;
    }
  `]
})
export class FlightSearchComponent implements OnInit {
  searchRequest: FlightSearchRequest = {
    source: '',
    destination: '',
    departureDate: ''
  };

  flights: Flight[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  searchFlights(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.flights = [];

    this.flightService.searchFlights(this.searchRequest).subscribe({
      next: (flights: Flight[]) => {
        this.flights = flights;
        this.isLoading = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.errorMessage = 'Error searching flights';
        this.isLoading = false;
      }
    });
  }

  bookNow(flightId: number): void {
    this.router.navigate(['/booking', flightId]);
  }
}
