import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard } from '../guard/auth.guard';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""

  constructor( private http : HttpClient, private router : Router , private app : AppComponent, private guard: AuthGuard
    , private config: ConfigService
    ) { }

  ngOnInit(): void {
  }

  authenticate(){
    let u = {"username" : this.username , "password" : this.password }
    
    // http://localhost:8080/api/login
    this.http.post<UserEntity>( environment.backendUri + "login" , u ).subscribe(
      {
        next: (data) => { 
          sessionStorage.setItem("connected" , "1" ); 
          sessionStorage.setItem("user" , JSON.stringify(data) )
          this.router.navigate(['client'])  
          this.app.user = data
          
          
          this.config.httpOptions.headers = new HttpHeaders({
              'Authorization' : "Basic " + data.password 
            });

          console.log( "Basic " + data.password ); 
          console.log( this.config.httpOptions.headers )
          
        },
        error: (err) => { console.log(err.error.message) }
      }
    )
  }
}
