import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight } from '../../models/flight.model';
import { FlightAdminService } from '../../services/flight-admin';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './manage-search.html',
  styleUrls: ['./manage-search.scss']
})
export class SearchAdminComponent implements OnInit {
  searchForm!: FormGroup;
  searchResults: Flight[] = [];
  allFlights: Flight[] = [];

  constructor(
    private fb: FormBuilder,
    private flightService: FlightAdminService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAllFlights();
  }

  initForm() {
    this.searchForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      flightDate: ['', Validators.required]
    });
  }

  loadAllFlights() {
    this.flightService.getAllFlights().subscribe((data: Flight[]) => {
      this.allFlights = data;
      this.searchResults = data;
    });
  }

  onSearch() {
    const { source, destination, flightDate } = this.searchForm.value;

    this.searchResults = this.allFlights.filter(flight =>
      flight.source.toLowerCase() === source.toLowerCase() &&
      flight.destination.toLowerCase() === destination.toLowerCase() &&
      flight.departureTime?.substring(0, 10) === flightDate
    );
  }

  clearSearch() {
    this.searchForm.reset();
    this.searchResults = [...this.allFlights];
  }
}
