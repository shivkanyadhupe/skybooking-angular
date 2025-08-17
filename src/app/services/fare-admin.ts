import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fare } from '../models/fare.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FareAdminService {
  private baseUrl = 'http://localhost:8085/fare';

  constructor(private http: HttpClient) {}

  // ✅ Admin: Get all fares
  getAllFares(): Observable<Fare[]> {
    return this.http.get<Fare[]>(`${this.baseUrl}/all`);
  }

  // ✅ Admin: Create fare
  addFare(fare: Fare): Observable<Fare> {
    return this.http.post<Fare>(`${this.baseUrl}/create`, fare);
  }

  // ✅ Admin: Update fare by ID (if implemented)
  updateFare(id: number, fare: Fare): Observable<Fare> {
    return this.http.put<Fare>(`${this.baseUrl}/${id}`, fare);
  }

  // ✅ Admin: Delete fare by ID (if implemented)
  deleteFare(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ✅ Public: Get fare by flightNumber & ticketType
  getFareByFlightAndType(flightNumber: string, ticketType: string): Observable<Fare> {
    return this.http.get<Fare>(`${this.baseUrl}?flightNumber=${flightNumber}&ticketType=${ticketType}`);
  }

  // ✅ Public: Get fare by ID
  getFareById(id: number): Observable<Fare> {
    return this.http.get<Fare>(`${this.baseUrl}/${id}`);
  }
}
