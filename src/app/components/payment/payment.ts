import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private baseUrl = 'http://localhost:8085/api/payment';

  constructor(private http: HttpClient) {}

  createPayment(amount: number): Observable<any> {
    const params = new HttpParams().set('amount', amount.toString());
    return this.http.post(`${this.baseUrl}/create`, null, { params });
  }
}
