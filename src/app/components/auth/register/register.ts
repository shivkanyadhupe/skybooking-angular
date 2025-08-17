// src/app/components/auth/register/register.ts
import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../services/auth"
import type { RegisterRequest } from "../../../models/user.model"

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./register.html",
  styleUrls: ["./register.scss"],
})
export class RegisterComponent {
  userData: RegisterRequest = {
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER", // default role
  }

  confirmPassword = ""
  isLoading = false
  errorMessage = ""
  successMessage = ""

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.userData.name || !this.userData.email || !this.userData.password || !this.confirmPassword) {
      this.errorMessage = "Please fill out all fields"
      return
    }

    if (this.userData.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match"
      return
    }

    this.isLoading = true
    this.errorMessage = ""
    this.successMessage = ""

    this.authService.register(this.userData).subscribe({
      next: () => {
        this.isLoading = false
        this.successMessage = "Account created successfully! Redirecting to login..."
        setTimeout(() => this.router.navigate(["/login"]), 2000)
      },
      error: (error) => {
        this.isLoading = false
        this.errorMessage = error?.error?.message || "Registration failed. Try a different email or check the server."
      },
    })
  }
}
