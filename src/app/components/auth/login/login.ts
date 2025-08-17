import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../services/auth";
import type { LoginRequest } from "../../../models/user.model";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./login.html",
  styleUrls: ["./login.scss"],
})
export class LoginComponent implements OnInit {
  credentials: LoginRequest = {
    email: "",
    password: "",
  };

  errorMessage = "";
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }
  }

  login(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = "Please enter both email and password";
      return;
    }

    this.isLoading = true;
    this.errorMessage = "";

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.isLoading = false;
        this.redirectBasedOnRole();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Login failed. Please try again.";
      },
    });
  }

  private redirectBasedOnRole(): void {
    const user = this.authService['currentUserSubject'].value; // 👈 access the BehaviorSubject
    if (!user) {
      this.router.navigate(["/login"]);
      return;
    }

    if (user.role === "ROLE_ADMIN") {
      this.router.navigate(["/admin"]);
    } else {
      this.router.navigate(["/dashboard"]);
    }
  }
}
