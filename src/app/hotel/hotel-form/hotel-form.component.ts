import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent implements OnInit {

  currentRate = 0;

  public hotelForm = new FormGroup({
    id : new FormControl("" , Validators.required),
    nom: new FormControl("" , Validators.required),
    etoiles: new FormControl("" , Validators.required),
    adresse: new FormControl("" , Validators.required),
    ville: new FormControl("" , Validators.required),
    telephone: new FormControl("" , Validators.required),
    email: new FormControl("" , Validators.required),
  });

  constructor(private hs : HotelService, private activatedRoute : ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    let hotelId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if( hotelId ){
      this.hs.getById( hotelId ).subscribe(
        data => { 
          this.hotelForm.setValue(data)
        }
      )
    }
  }
  
  public submit(): void {
    let hotel = this.hotelForm.value

    console.log( hotel ); 

    if( hotel.id == undefined || hotel.id == '' || hotel.id == 0 ){
      this.hs.add(hotel).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['hotel'])
        }
      )
    }else{
      this.hs.update(hotel).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['hotel'])
        }
      )
    }

  }

}
