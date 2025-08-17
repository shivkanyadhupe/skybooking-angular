import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes }         from './app.routes';

/* ★ FIXED ★
   ──────────────────────────────────────────────────────────────
   1. Correct relative path:  './interceptors/auth-interceptor'
   2. Correct class‑name:      AuthInterceptor (capital “A”)
*/
import { AuthInterceptor } from './interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    /* register interceptor */
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,          // ← allow multiple interceptors
    },
  ],
};
