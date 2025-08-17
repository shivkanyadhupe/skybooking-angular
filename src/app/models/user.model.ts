export interface User {
  id: number
  name: string
  email: string
  role: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role: string
}

export interface AuthResponse {
  token: string
  userId: number
  name: string        // ✅ Required to fix the TS error
  email: string
  role: string
}
