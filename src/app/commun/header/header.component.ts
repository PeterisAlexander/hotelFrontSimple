import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/entities/user.entity';
import { AuthGuard } from 'src/app/guard/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user : UserEntity = new UserEntity();


  constructor( private router : Router , public guard : AuthGuard) { }

  ngOnInit(): void {
    
  }

  submit(){

  }

  logout():void {
    console.log( "logout" ); 
    sessionStorage.removeItem("connected")
    this.router.navigate(['login'])
    sessionStorage.removeItem("user")
   //ChangeDetectorRef.detectChanges()
  }
}
