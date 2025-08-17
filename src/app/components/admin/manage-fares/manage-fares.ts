import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FareAdminService } from '../../../services/fare-admin';
import { Fare } from '../../../models/fare.model';

@Component({
  selector: 'app-manage-fares',
  templateUrl: './manage-fares.html',
  styleUrls: ['./manage-fares.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ManageFaresComponent implements OnInit {
  fareForm!: FormGroup;
  fares: Fare[] = [];
  editingFareId: number | null = null;

  constructor(private fb: FormBuilder, private fareService: FareAdminService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchFares();
  }

  initializeForm() {
    this.fareForm = this.fb.group({
      flightNumber: ['', Validators.required],
      ticketType: ['ECONOMY', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }

  fetchFares() {
    this.fareService.getAllFares().subscribe((data: Fare[]) => {
      this.fares = data;
    });
  }

  submitFare() {
    if (this.fareForm.invalid) return;

    const formValue: Fare = this.fareForm.value;

    if (this.editingFareId !== null) {
      this.fareService.updateFare(this.editingFareId, formValue).subscribe(() => {
        this.fetchFares();
        this.cancelEdit();
      });
    } else {
      this.fareService.addFare(formValue).subscribe(() => {
        this.fetchFares();
        this.fareForm.reset({ ticketType: 'ECONOMY', price: 0 });
      });
    }
  }

  editFare(fare: Fare) {
    this.editingFareId = fare.id!;
    this.fareForm.setValue({
      flightNumber: fare.flightNumber,
      ticketType: fare.ticketType,
      price: fare.price,
    });
  }

  deleteFare(id: number) {
    if (confirm('Are you sure you want to delete this fare?')) {
      this.fareService.deleteFare(id).subscribe(() => {
        this.fetchFares();
      });
    }
  }

  cancelEdit() {
    this.editingFareId = null;
    this.fareForm.reset({ ticketType: 'ECONOMY', price: 0 });
  }
}
