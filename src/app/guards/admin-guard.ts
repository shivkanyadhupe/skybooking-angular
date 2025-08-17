// src/app/guards/admin-guard.ts
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../services/auth"

export const adminGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAdmin()) return true

  router.navigate(["/"])
  return false
}
