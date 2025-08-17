// ─────────────────────────────────────────────
// File: src/app/components/booking/booking.ts (Optimal Fix)
// ─────────────────────────────────────────────

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs'; // Import firstValueFrom

// Corrected import paths for services and models
import { BookingService } from '../../services/booking'; // Using booking.ts
import { AuthService } from '../../services/auth';     // Using auth.ts
import { PaymentService, PaymentInitResponse } from '../../services/payment'; // Using payment.ts
import { FareService } from '../../fare';     // Corrected import path for FareService
import { BookingRequest } from '../../models/booking.model';
import { User } from '../../models/user.model'; // Assuming User model is in user.model.ts

declare var Razorpay: any; // Declare Razorpay to avoid TypeScript errors

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './booking.html', // Ensure this is the correct path for your HTML template
  styleUrls: ['./booking.scss'] // Ensure this is the correct path for your SCSS file
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  fareAmount: number = 0;
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService,
    private paymentService: PaymentService,
    private fareService: FareService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // Subscribe to currentUser$ to get the current user data
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.errorMessage = 'User not logged in. Please log in to proceed.';
        this.router.navigate(['/login']);
      }
    });

    this.bookingForm = this.fb.group({
      passengerName: ['', Validators.required],
      flightNumber: ['', Validators.required],
      numOfAdults: [1, [Validators.required, Validators.min(1)]],
      numOfChildren: [0, [Validators.min(0)]],
      ticketType: ['ECONOMY', Validators.required],
      seatNumber: ['', Validators.required]
    });

    this.bookingForm.valueChanges.subscribe(() => {
      this.calculateFare();
    });
  }

  calculateFare(): void {
    const { flightNumber, ticketType, numOfAdults, numOfChildren } = this.bookingForm.value;

    this.errorMessage = '';

    if (!flightNumber || !ticketType) {
      this.fareAmount = 0;
      return;
    }

    this.fareService.getUnitFare(flightNumber, ticketType).subscribe({
      next: (unitFare: number) => { // Explicitly type unitFare
        const totalFare = unitFare * numOfAdults + (unitFare * 0.5 * numOfChildren);
        this.fareAmount = Math.round(totalFare);
        this.successMessage = '';
      },
      error: (err: any) => { // Explicitly type err
        console.error('Fare calculation failed:', err);
        this.errorMessage = 'Failed to calculate fare. Please check flight details.';
        this.fareAmount = 0;
      }
    });
  }

  async payAndBook(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.bookingForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      this.bookingForm.markAllAsTouched();
      return;
    }

    if (this.fareAmount <= 0) {
      this.errorMessage = 'Fare amount must be greater than zero. Please calculate fare.';
      return;
    }

    this.isSubmitting = true;

    try {
      // Use firstValueFrom to convert Observable to Promise.
      // Assert type here, as the 'if' check below handles the possibility of undefined.
      const paymentData: PaymentInitResponse = await firstValueFrom(this.paymentService.createPayment(this.fareAmount));

      if (!paymentData || !paymentData.orderId || !paymentData.razorpayKey) {
        throw new Error('Invalid payment initiation response from backend.');
      }

      this.openRazorpay(paymentData);

    } catch (err: any) { // Explicitly type err
      console.error('Payment initiation failed:', err);
      this.errorMessage = err.message || 'Payment initialization failed. Please try again.';
      this.isSubmitting = false;
    }
  }

  private openRazorpay(paymentData: PaymentInitResponse): void {
    const form = this.bookingForm.value;
    const user = this.currentUser; // Use the component's currentUser property

    const options = {
      key: paymentData.razorpayKey,
      amount: (paymentData.amount * 100).toString(), // Razorpay expects amount in paise and as string
      currency: paymentData.currency,
      order_id: paymentData.orderId,
      name: 'SkyBooking',
      description: 'Flight Booking Payment',
      handler: (response: any) => this.verifyAndCreateBooking(response),
      prefill: {
        name: user?.name || form.passengerName,
        email: user?.email || '',
        // Removed 'contact' as it's not in the User interface
      },
      theme: {
        color: '#4e73df'
      }
    };

    const rzp = new Razorpay(options);

    rzp.on('payment.failed', (response: any) => {
      console.error('Razorpay payment failed:', response);
      this.errorMessage = `Payment failed: ${response.error.description || 'Unknown error'}`;
      this.isSubmitting = false;
    });

    rzp.open();
  }

  private verifyAndCreateBooking(paymentResponse: any): void {
    // This part is crucial for security: verify the payment signature on your backend
    this.paymentService.verifyPayment(paymentResponse).subscribe({
      next: (res: any) => { // Explicitly type res
        // MOCKED: Assuming 'status: success' from mocked backend verification
        if (res.status === 'success') {
          this.submitBooking();
        } else {
          this.errorMessage = res.message || 'Payment verification failed. Please try again.';
          this.isSubmitting = false;
        }
      },
      error: (err: any) => { // Explicitly type err
        console.error('Payment verification failed:', err);
        this.errorMessage = 'Payment verification failed due to an error.';
        this.isSubmitting = false;
      }
    });
  }

  private submitBooking(): void {
    const user = this.currentUser; // Use the component's currentUser property
    if (!user?.email) {
      this.errorMessage = 'User email not found. Please log in again.';
      this.router.navigate(['/login']);
      this.isSubmitting = false;
      return;
    }

    const formValue = this.bookingForm.value;

    const bookingData: BookingRequest = {
      passengerName: formValue.passengerName,
      flightNumber: formValue.flightNumber,
      numOfAdults: formValue.numOfAdults,   // Use numOfAdults to match Java DTO
      numOfChildren: formValue.numOfChildren, // Use numOfChildren to match Java DTO
      seatNumber: formValue.seatNumber,
      ticketType: formValue.ticketType,
      userEmail: user.email,
      totalFare: this.fareAmount // Send the calculated fare to the backend
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: (res: any) => { // Explicitly type res
        this.successMessage = `Booking Successful! Ticket ID: ${res.ticketId || res.id}`;
        this.bookingForm.reset();
        this.fareAmount = 0;
        this.isSubmitting = false;

        setTimeout(() => this.router.navigate(['/my-bookings']), 2000);
      },
      error: (err: any) => { // Explicitly type err
        console.error('Booking creation failed:', err);
        this.errorMessage = err.error?.message || 'Booking failed. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
