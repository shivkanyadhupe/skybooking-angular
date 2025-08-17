// ──────────────────────────────────────────────
// File: src/app/services/fare.ts
// ──────────────────────────────────────────────

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface FareResponse {
  flightNumber : string;
  ticketType   : string;
  price        : number;
}

@Injectable({ providedIn: 'root' })
export class FareService {
  private readonly API = 'http://localhost:8085/fare';

  constructor(private http: HttpClient) {}

  /**
   * GET /fare?flightNumber=AI101&ticketType=Business
   */
  getUnitFare(flightNo: string, ticketType: string): Observable<number> {
    const params = new HttpParams()
      .set('flightNumber', flightNo.trim())
      .set('ticketType', ticketType.trim()); // ⛔ removed .toUpperCase()

    return this.http.get<FareResponse>(this.API, { params }).pipe(
      map(res => res.price),
      catchError(err => {
        console.error('Fare lookup failed →', err);
        return throwError(() => new Error('Could not fetch fare'));
      })
    );
  }
}
