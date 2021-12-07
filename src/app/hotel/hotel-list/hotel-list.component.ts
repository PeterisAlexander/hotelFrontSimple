import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { HotelEntity } from 'src/app/entities/hotel.entity';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  currentRate = 0;

  hotels: Array<HotelEntity> = [];

  hotel: HotelEntity = new HotelEntity();

  search: string = "";

  errorMessage: string = "";

  success: boolean = false;

  @ViewChild('closebutton') closebuttonelement: any;

  getTabEtoile(nbEtoiles:number){
    return new Array(nbEtoiles)
  }

  searchForm = new FormGroup({
    item : new FormControl(""),
  });

  constructor(private hs: HotelService ) {
  }

  ngOnInit(): void {
    this.reloadHotels();
  }

  reloadHotels(): void {
    console.log("search == " + this.searchForm.get('item')?.value );

    console.log(this.hotels);

    this.hs.getAll().subscribe({
      next: (data) => { 
        this.hotels = data;
      },
      error: (err) => { console.log(err.error.message) }
    });
  }

  delete(id: number | undefined): void {

    if (confirm("Êtes vous sur de vouloir supprimer cet hôtel ?")) {
      this.hs.delete(id).subscribe(
        _data => {
          this.reloadHotels();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  edit(id?: number) {
    this.hs.getById(id).subscribe(
      data => { this.hotel = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  reset(): void {
    this.errorMessage = "";
    this.hotel = new HotelEntity();
  }

  submitHotel() {
    let obs: Observable<any>;
    if (this.hotel.id == undefined) { // Ajout
      obs = this.hs.add(this.hotel);
    } else { // Edition
      obs = this.hs.update(this.hotel);
    }

    obs.subscribe(
      {
        next: () => {
          this.reloadHotels();
          this.closebuttonelement.nativeElement.click();
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
