// ─────────────────────────────────────────────
// File: src/app/services/payment.ts (Updated for Optimal Parsing & Debugging)
// ─────────────────────────────────────────────

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface PaymentInitResponse {
  razorpayKey: string;
  orderId: string;
  amount: number;   // Amount in rupees (as a number)
  currency: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  // Your backend Payment Service is directly on port 8085, not via API Gateway for this endpoint.
  private readonly API = 'http://localhost:8085/api/payment';

  // IMPORTANT: Your provided Razorpay Key ID
  private readonly RAZORPAY_KEY_ID = 'rzp_test_CHgUTI5ifP3Jcx';

  constructor(private http: HttpClient) {}

  createPayment(amountRs: number): Observable<PaymentInitResponse> {
    const params = new HttpParams().set('amount', amountRs.toString());

    return this.http.post(`${this.API}/create`, null, { params, responseType: 'text' }).pipe(
      map(responseString => {
        console.log('--- Payment Response Debug Start ---');
        console.log('Raw payment create response from backend:', responseString);

        let parsedData: { [key: string]: string } = {};
        let isJsonParsed = false;

        // Attempt to parse as JSON first (this is the ideal scenario if backend sends proper JSON)
        try {
          const jsonResponse = JSON.parse(responseString);
          if (jsonResponse && typeof jsonResponse === 'object') {
            for (const key in jsonResponse) {
              if (Object.prototype.hasOwnProperty.call(jsonResponse, key)) {
                parsedData[key] = String(jsonResponse[key]);
              }
            }
            isJsonParsed = true;
            console.log('Attempted to parse as JSON. Result:', parsedData);
          }
        } catch (e) {
          console.warn('Backend response is not valid JSON. Attempting fallback string parsing.');
        }

        // Fallback string parsing if JSON.parse failed or didn't yield expected structure
        if (!isJsonParsed) {
          // Remove all curly braces and trim whitespace
          const cleanedString = responseString.replace(/[{}]/g, '').trim();
          console.log('Cleaned string for fallback parsing:', cleanedString);

          // Regex to find all "key=value" pairs, robust to spaces around '=' and commas
          // It looks for a word character (key), then '=', then anything until a comma or end of string (value)
          const keyValuePairs = cleanedString.match(/(\w+)\s*=\s*([^,]+)/g);
          console.log('Extracted key-value pairs (raw):', keyValuePairs);

          if (keyValuePairs) {
            keyValuePairs.forEach(pair => {
              const parts = pair.split('=').map(p => p.trim());
              if (parts.length >= 2) {
                // Join remaining parts for value in case the value itself contains '='
                parsedData[parts[0]] = parts.slice(1).join('=');
              }
            });
          }
          console.log('Parsed from string (fallback):', parsedData);
        }

        // Validate extracted data
        if (!parsedData['id'] || !parsedData['amount'] || !parsedData['currency']) {
          console.error('Missing required fields (id, amount, currency) after parsing. Current parsed data:', parsedData);
          throw new Error('Failed to parse payment initiation response from backend. Missing required fields.');
        }

        console.log('--- Payment Response Debug End ---');
        return {
          razorpayKey: this.RAZORPAY_KEY_ID,
          orderId: parsedData['id'],
          amount: parseFloat(parsedData['amount']), // Convert amount string to number
          currency: parsedData['currency']
        } as PaymentInitResponse;
      }),
      catchError(err => {
        console.error('Error creating payment on backend or parsing response:', err);
        let userMessage = 'Failed to initiate payment. Please check backend response format and network.';
        if (err.status === 0) {
          userMessage = 'Network error or backend is unreachable. Please ensure all services are running.';
        } else if (err.error && typeof err.error === 'string') {
          userMessage = `Backend returned an error: ${err.error}`;
        }
        return throwError(() => new Error(userMessage));
      })
    );
  }

  verifyPayment(body: any): Observable<any> {
    console.warn('WARNING: Payment verification is MOCKED on the frontend. This is INSECURE for production.');
    console.log('Mocking payment verification for:', body);
    return of({ status: 'success', message: 'Payment verification mocked successfully' }).pipe(
      map(res => {
        return res;
      })
    );
  }
}
