import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UserEntity } from 'src/app/entities/user.entity';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ConfigService } from 'src/app/services/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @ViewChild('fileInput') inputEl: ElementRef | undefined;
  @ViewChild('closebutton') closebuttonelement: any;


  constructor(private guard: AuthGuard, private http: HttpClient, public app: AppComponent, private config: ConfigService ) { this.app.user = new UserEntity() }

  
  ngOnInit(): void {
    this.app.user = this.guard.getUser();
  }

  ngAfterViewInit() {
    
  }

  submit() {
    let inputEl: HTMLInputElement = this.inputEl?.nativeElement;

    console.log( inputEl.files );

    if (inputEl != undefined && inputEl.files != undefined) {
      console.log("je suis bien dans le if");
      let fileCount: number = inputEl.files.length;
      let formData = new FormData();

      let user = this.app.user

      formData.append('username', "" + user.username);
      formData.append('password', "" + user.password);

      if (fileCount > 0) { // a file was selected  
        formData.append('photouser', inputEl.files[0]);
      }

      console.log("before req");
      console.log(user);

      console.log("before req");
      console.log(this.app.user);

      this.http.put<UserEntity>(environment.backendUri + "profil/" + user.id, formData, this.config.httpOptions ).subscribe(
        {
          next: (data) => {
            console.log("in req");
            console.log(user)

            //this.app.user = data
            sessionStorage.setItem("user" , JSON.stringify(data) )
            this.ngAfterViewInit()
            this.closebuttonelement.nativeElement.click();
          },
          error: (err) => { console.log(err.error.message) }
        }
      )

      // do whatever you do...
      // subscribe to observable to listen for response
    }

  }

}
