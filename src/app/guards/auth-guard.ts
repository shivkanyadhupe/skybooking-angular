import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth";

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) return true;

  /* remember attempted URL */
  const attempted = router.routerState.snapshot.url;
  localStorage.setItem("postLoginRedirect", attempted);

  router.navigate(["/login"]);
  return false;
};
