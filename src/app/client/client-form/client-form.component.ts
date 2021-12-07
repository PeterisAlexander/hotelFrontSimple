import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  public clientForm = new FormGroup({
    id : new FormControl("" , Validators.required),
    nomComplet: new FormControl("" , Validators.required),
    adresse: new FormControl("" , Validators.required),
    telephone: new FormControl("" , Validators.required),
    email: new FormControl("" , Validators.required),
  });

  constructor(private cs : ClientService, private activatedRoute : ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    let clientId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    if( clientId ){
      this.cs.getById( clientId ).subscribe(
        data => { 
          this.clientForm.setValue(data)
        }
      )
    }
  }
  
  public submit(): void {
    let client = this.clientForm.value

    console.log( client ); 

    if( client.id == undefined || client.id == '' || client.id == 0 ){
      this.cs.add(client).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['client'])
        }
      )
    }else{
      this.cs.update(client).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['client'])
        }
      )
    }

  }

}
