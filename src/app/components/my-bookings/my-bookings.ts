// src/app/components/my-bookings/my-bookings.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.html'
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  error = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchAllBookings();
  }

  fetchAllBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (res) => {
        this.bookings = res;
      },
      error: () => {
        this.error = '❌ Failed to load bookings.';
      }
    });
  }
}
