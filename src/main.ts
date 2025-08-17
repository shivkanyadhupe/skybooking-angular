// ────────────────────────────────────────────────────────────
// File: src/main.ts
// ────────────────────────────────────────────────────────────
import { bootstrapApplication }       from '@angular/platform-browser';
import { provideRouter }              from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { importProvidersFrom }        from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent }               from './app/app';
import { routes }                     from './app/app.routes';
import { AuthInterceptor }            from './app/interceptors/auth-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    // HttpClient + pick up interceptors defined in DI
    provideHttpClient(withInterceptorsFromDi()),

    // Register our auth interceptor class
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    importProvidersFrom(FormsModule, ReactiveFormsModule)
  ]
}).catch(err => console.error(err));
