import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private baseUrl = 'http://localhost:8082/flights';

  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/all`);
  }

  addFlight(flight: Flight): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, flight);
  }

  updateFlight(id: number, flight: Flight): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, flight);
  }

  deleteFlight(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
