import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client/client-form/client-form.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { AuthGuard } from './guard/auth.guard';
import { HotelFormComponent } from './hotel/hotel-form/hotel-form.component';
import { HotelListComponent } from './hotel/hotel-list/hotel-list.component';
import { LoginComponent } from './login/login.component';
import { ReservationFormComponent } from './reservation/reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';

const routes: Routes = [
  { path : "login" , component: LoginComponent },

  { path:"client", component:ClientListComponent, canActivate: [AuthGuard]},
  { path : "client/addedit/:id" , component: ClientFormComponent, canActivate: [AuthGuard] },

  { path:"hotel", component:HotelListComponent, canActivate: [AuthGuard]},
  { path : "hotel/addedit/:id" , component: HotelFormComponent, canActivate: [AuthGuard] },

  { path:"reservation", component:ReservationListComponent, canActivate: [AuthGuard]},
  { path : "reservation/addedit/:id" , component: ReservationFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
