import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ClientEntity } from 'src/app/entities/client.entity';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Array<ClientEntity> = [];

  client: ClientEntity = new ClientEntity();

  search: string = ""

  errorMessage: string = ""

  success: boolean = false

  searchForm = new FormGroup({
    item : new FormControl(""),
  });

  constructor(private cs: ClientService ) {
  }

  ngOnInit(): void {
    this.reloadClients();
  }

  public reloadClients(): void {
    console.log("search == " + this.searchForm.get('item')?.value );

    this.cs.getAll().subscribe({
      next: (data) => { this.clients = data },
      error: (err) => { console.log(err.error.message) }
    });
  }

  public delete(id: number | undefined): void {

    if (confirm("Êtes vous sur ?")) {
      this.cs.delete(id).subscribe(
        data => {
          this.reloadClients();
        }
        //, err => console.log( "Une erreur est survenue" )
      );
    }
  }

  public edit(id?: number) {
    this.cs.getById(id).subscribe(
      data => { this.client = data }
      //, err => console.log( "Une erreur est survenue" )
    );
  }

  public submitClient() {
    let obs: Observable<any>;
    if (this.client.id == undefined) { // Ajout
      obs = this.cs.add(this.client);
    } else { // Edition
      obs = this.cs.update(this.client);
    }

    obs.subscribe(
      {
        next: () => {
          this.reloadClients();
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
