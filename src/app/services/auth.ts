import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";

import type {
  User,             // { id, name, email, role }
  LoginRequest,     // { email, password }
  RegisterRequest,  // { name, email, password, etc. }
  AuthResponse      // { userId, name, email, role, token }
} from "../models/user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly API_URL = "http://localhost:8081/api/users";

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  /* ── AUTH METHODS ─────────────────────────── */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(tap(res => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res));
        this.setUser({
          id: res.userId,
          name: res.name,
          email: res.email,
          role: res.role
        });
      }));
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data);
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.currentUserSubject.next(null);
    // You can optionally redirect to login page here
  }

  /* ── SESSION MANAGEMENT ───────────────────── */
  private restoreSession(): void {
    const token = localStorage.getItem("token");
    const raw = localStorage.getItem("user");
    if (!token || !raw) return;

    try {
      const parsed = JSON.parse(raw) as AuthResponse;
      this.setUser({
        id: parsed.userId,
        name: parsed.name,
        email: parsed.email,
        role: parsed.role
      });
    } catch {
      this.logout();
    }
  }

  /* ── GETTERS / HELPERS ────────────────────── */
  setUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isExpired(token);
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === "ROLE_ADMIN";
  }

  private isExpired(token: string): boolean {
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      return exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }
}
