import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlightSearchComponent } from "../flight-search/flight-search";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, FlightSearchComponent],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
})
export class HomeComponent {
  isAdmin: boolean = false;

  constructor() {
    const user = this.getLoggedInUser();
    this.isAdmin = user?.role === 'ADMIN';
  }

  getLoggedInUser(): any {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
          email: payload.sub,
          role: payload.role
        };
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
    return null;
  }
}
