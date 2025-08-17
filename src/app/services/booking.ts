// ─────────────────────────────────────────────
// File: src/app/services/booking.ts (Final Update)
// ─────────────────────────────────────────────

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingRequest, Booking } from '../models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Use API Gateway port 8080 for booking service
  private baseUrl = 'http://localhost:8084/booking';

  constructor(private http: HttpClient) {}

  createBooking(data: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/create`, data);
  }

  getBookingById(id: number): Observable<Booking> { // ID is number for MySQL
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  getAllBookings(): Observable<Booking[]> {
    // Corrected URL to use API Gateway and backend endpoint
    return this.http.get<Booking[]>(`${this.baseUrl}/all`);
  }

  updateBooking(id: number, data: BookingRequest): Observable<Booking> { // ID is number
    return this.http.put<Booking>(`${this.baseUrl}/${id}`, data);
  }

  deleteBooking(id: number): Observable<void> { // ID is number
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

// // src/app/services/booking.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BookingRequest, Booking } from '../models/booking.model';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BookingService {
//   private baseUrl = 'http://localhost:8084/booking';

//   constructor(private http: HttpClient) {}

//   createBooking(data: BookingRequest): Observable<Booking> {
//     return this.http.post<Booking>(`${this.baseUrl}/create`, data);
//   }

//   /** ✅ For "My Bookings" - get all bookings (no filtering by email) */
//   getAllBookings(): Observable<Booking[]> {
//     return this.http.get<Booking[]>('http://localhost:8085/bookings');
//   }
// }
