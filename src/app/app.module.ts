import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './commun/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './commun/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientListComponent } from './client/client-list/client-list.component';
import { LoginComponent } from './login/login.component';
import { ClientFormComponent } from './client/client-form/client-form.component';
import { ConfigService } from './services/config.service';
import { HotelListComponent } from './hotel/hotel-list/hotel-list.component';
import { HotelFormComponent } from './hotel/hotel-form/hotel-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './reservation/reservation-form/reservation-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientFormComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HotelListComponent,
    HotelFormComponent,
    ReservationListComponent,
    ReservationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
