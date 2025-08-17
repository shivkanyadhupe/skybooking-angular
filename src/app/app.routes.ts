import { Routes } from '@angular/router';

/* PUBLIC */
import { HomeComponent } from './components/home/home';
import { FlightSearchComponent } from './components/flight-search/flight-search';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';

/* USER */
import { BookingComponent } from './components/booking/booking';
import { MyBookingsComponent } from './components/my-bookings/my-bookings';

/* ADMIN */
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard';
import { ManageFlightsComponent } from './components/admin/manage-flights/manage-flights';
import { ManageFaresComponent } from './components/admin/manage-fares/manage-fares';

import { ManageBookingsComponent } from './components/admin/manage-bookings/manage-bookings';
import { UserManagementComponent } from './components/admin/user-management/user-management';

/* GUARDS */
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: FlightSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'booking/:flightId', component: BookingComponent, canActivate: [authGuard] },
  { path: 'my-bookings', component: MyBookingsComponent, canActivate: [authGuard] },

 {
  path: 'admin',
  canActivate: [authGuard, adminGuard],
  children: [
    { path: '', component: AdminDashboardComponent },
    { path: 'flights', component: ManageFlightsComponent },
    { path: 'fares', component: ManageFaresComponent },
    { path: 'bookings', component: ManageBookingsComponent },
    { path: 'users', component: UserManagementComponent }
  ]
},


  { path: '**', redirectTo: '' }
];
