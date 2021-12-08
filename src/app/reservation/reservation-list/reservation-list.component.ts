import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ClientEntity } from 'src/app/entities/client.entity';
import { HotelEntity } from 'src/app/entities/hotel.entity';
import { ReservationEntity } from 'src/app/entities/reservation.entity';
import { ClientService } from 'src/app/services/client.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  resas: Array<ReservationEntity> = [];
  resa: ReservationEntity = new ReservationEntity();

  clients: Array<ClientEntity> = [];
  hotels: Array<HotelEntity> = [];

  clientRecherche: number = 0;

  errorMessage: string = ""

  success: boolean = false

  searchForm = new FormGroup({
    item : new FormControl(""),
  });

  constructor(private rs: ReservationService, private cs : ClientService, private hs : HotelService ) {
  }

  ngOnInit(): void {
    this.reloadResas();

    this.cs.getAll().subscribe({
      next: (data) => { this.clients = data },
      error: (err) => { console.log(err.error.message) }
    });

    this.hs.getAll().subscribe({
      next: (data) => { this.hotels = data },
      error: (err) => { console.log(err.error.message) }
    });
  }

  public reloadResas(): void {
    console.log("search == " + this.searchForm.get('item')?.value );

    this.rs.getAll(this.clientRecherche).subscribe({
      next: (data) => { this.resas = data },
      error: (err) => { console.log(err.error.message) }
    });
  }

  public delete(id: number | undefined): void {

    if (confirm("Êtes vous sur ?")) {
      this.rs.delete(id).subscribe(
        data => {
          this.reloadResas();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  public edit(id?: number) {
    this.rs.getById(id).subscribe(
      data => { this.resa = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  public submitClient() {
    let obs: Observable<any>;
    if (this.resa.id == undefined) { // Ajout
      obs = this.rs.add(this.resa);
    } else { // Edition
      obs = this.rs.update(this.resa);
    }

    obs.subscribe(
      {
        next: () => {
          this.reloadResas();
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 5000);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      }
    );


  }
}
