// ─────────────────────────────────────────────
// File: src/app/services/flight.service.ts
// ─────────────────────────────────────────────
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { Flight, FlightSearchRequest } from '../models/flight.model';

@Injectable({ providedIn: 'root' })
export class FlightService {
  /** 👉 change to your real API host/port if different */
  private readonly API = 'http://localhost:8082/flights';

  constructor(private http: HttpClient) {}

  /* ---------- PUBLIC CRUD + SEARCH METHODS ---------- */

  /** GET /flights */
  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.API);
  }

  /** GET /flights/{id} */
  getFlightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.API}/${id}`);
  }

  /** GET /flights/search?source=…&destination=…&date=… */
  searchFlights(req: FlightSearchRequest): Observable<Flight[]> {
    const params = new HttpParams()
      .set('source', req.source)
      .set('destination', req.destination)
      .set('date', req.departureDate);
    return this.http.get<Flight[]>(`${this.API}/search`, { params });
  }

  /** POST /flights */
  createFlight(data: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.API, data);
  }

  /** PUT /flights/{id} */
  updateFlight(id: number, data: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${this.API}/${id}`, data);
  }

  /** DELETE /flights/{id} */
  deleteFlight(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
