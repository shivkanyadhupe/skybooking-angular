// ─────────────────────────────────────────────
// File: src/app/components/admin/manage-bookings/manage-bookings.ts (Confirmed Correct)
// ─────────────────────────────────────────────

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../services/booking-admin'; // Keeping your specified path
import type { Booking } from '../../../models/booking.model';

@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-bookings.html',
  styleUrls: ['./manage-bookings.scss']
})
export class ManageBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (data: Booking[]) => { // Explicitly type 'data' as Booking[]
        this.bookings = data;
        this.errorMessage = '';
      },
      error: (err: any) => { // Explicitly type 'err'
        this.errorMessage = 'Failed to load bookings.';
        console.error(err);
      }
    });
  }

  deleteBooking(id: number): void { // Ensure 'id' is typed as 'number'
    if (!confirm('Are you sure you want to delete this booking?')) { // Using confirm for simplicity as per previous code
      return;
    }
    this.bookingService.deleteBooking(id).subscribe({
      next: () => {
        this.successMessage = 'Booking deleted successfully!';
        this.errorMessage = '';
        this.loadBookings(); // Reload bookings after deletion
      },
      error: (err: any) => { // Explicitly type 'err'
        this.errorMessage = 'Error deleting booking.';
        console.error(err);
      }
    });
  }

  /**
   * Formats a date string. Handles undefined input gracefully.
   * @param dateStr The date string to format.
   * @returns Formatted date string or 'N/A' if input is invalid/undefined.
   */
  formatDate(dateStr: string | undefined): string { // 'dateStr' can be string or undefined
    if (!dateStr) {
      return 'N/A';
    }
    try {
      const date = new Date(dateStr);
      // Check if date is valid before formatting
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid Date';
    }
  }

  /**
   * Returns CSS classes based on booking status. Handles undefined input gracefully.
   * @param status The booking status string.
   * @returns Bootstrap badge classes.
   */
  statusClass(status: string | undefined): string { // 'status' can be string or undefined
    if (!status) {
      return 'badge bg-secondary'; // Default for undefined status
    }
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'badge bg-success';
      case 'pending':
        return 'badge bg-warning';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  }
}
