import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientEntity } from 'src/app/entities/client.entity';
import { HotelEntity } from 'src/app/entities/hotel.entity';
import { ReservationEntity } from 'src/app/entities/reservation.entity';
import { ClientService } from 'src/app/services/client.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  resa : ReservationEntity = new ReservationEntity();

  clients : Array<ClientEntity> = [];
  hotels : Array<HotelEntity> = [];

  public resaForm = new FormGroup({
    id : new FormControl("" , Validators.required),
    client: new FormControl(null , Validators.required),
    hotel: new FormControl(null , Validators.required),
    dateDepart: new FormControl("" , Validators.required),
    dateFin: new FormControl("" , Validators.required),
    numChambre: new FormControl("" , Validators.required),
  });

  constructor(
    private rs : ReservationService,
    private cs: ClientService,
    private hs: HotelService,
    private activatedRoute : ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.cs.getAll().subscribe( data => this.clients = data);
    this.hs.getAll().subscribe( data => this.hotels = data);

    let resaId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if( resaId ){
      this.rs.getById( resaId ).subscribe(
        data => { 
          this.resaForm.setValue(data)
        }
      )
    }
  }

  public checkClient( c1 : ClientEntity, c2: ClientEntity ):boolean{
    return c1 != undefined && c2!=undefined && c1.id == c2.id; 
  }

  public checkHotel( h1 : HotelEntity, h2: HotelEntity ):boolean{
    return h1 != undefined && h2!=undefined && h1.id == h2.id; 
  }
  
  public submit(): void {
    let resa = this.resaForm.value

    console.log( resa ); 

    if( resa.id == undefined || resa.id == '' || resa.id == 0 ){
      this.rs.add(resa).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['reservation'])
        }
      )
    }else{
      this.rs.update(resa).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['reservation'])
        }
      )
    }

  }

}
