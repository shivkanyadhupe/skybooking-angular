import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight } from '../../../models/flight.model';
import { FlightAdminService } from '../../../services/flight-admin';
import { HttpClientModule } from '@angular/common/http';
imports: [CommonModule, ReactiveFormsModule, HttpClientModule]

@Component({
  selector: 'app-manage-flights',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './manage-flights.html',
  styleUrls: ['./manage-flights.scss']
})
export class ManageFlightsComponent implements OnInit {
  flightForm!: FormGroup;
  flights: Flight[] = [];
  editingFlightId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightAdminService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFlights();
  }
 trackByFlightId(index: number, flight: Flight): number {
  return flight.id!;
}

  initForm() {
    this.flightForm = this.fb.group({
      id: [null],
      flightNumber: ['', Validators.required],
      airline: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      totalSeats: [0, [Validators.required, Validators.min(1)]],
      availableSeats: [0, [Validators.required, Validators.min(1)]],
      fare: [0, [Validators.required, Validators.min(0)]]
    });
  }

  loadFlights() {
    this.flightService.getAllFlights().subscribe(data => {
      this.flights = data;
    });
  }

  submitFlight() {
    const raw = this.flightForm.value;

    // Combine date and time properly if needed
    const formattedFlight: Flight = {
      ...raw,
      departureTime: new Date(raw.departureTime).toISOString(),
      arrivalTime: new Date(raw.arrivalTime).toISOString()
    };

    if (this.editingFlightId !== null) {
      this.flightService.updateFlight(this.editingFlightId, formattedFlight).subscribe(() => {
        this.loadFlights();
        this.cancelEdit();
      });
    } else {
      this.flightService.addFlight(formattedFlight).subscribe(() => {
        this.loadFlights();
        this.flightForm.reset();
      });
    }
  }

  editFlight(flight: Flight) {
    this.editingFlightId = flight.id!;
    this.flightForm.patchValue(flight);
  }

  deleteFlight(id: number) {
  const confirmDelete = confirm('Are you sure you want to delete this flight?');
  if (confirmDelete) {
    this.flightService.deleteFlight(id).subscribe(() => {
      // Remove the deleted flight from the array without full refresh
      this.flights = this.flights.filter(flight => flight.id !== id);
    });
  }
}


  cancelEdit() {
    this.editingFlightId = null;
    this.flightForm.reset();
  }
}
