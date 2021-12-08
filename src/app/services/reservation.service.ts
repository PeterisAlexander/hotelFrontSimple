import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservationEntity } from '../entities/reservation.entity';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAll(idclient?: number): Observable<ReservationEntity[]> {
    console.log(
      environment.backendUri + 'resa?' + ( idclient == undefined ? "" : "&client=" + idclient )
    );

    return this.http.get<ReservationEntity[]>(
      environment.backendUri + 'resa?'  + ( idclient == undefined || (""+idclient) == "" || idclient == 0 ? "" : "&client=" + idclient ) , this.config.httpOptions
    );
  }

  delete(id?: number): Observable<any> {
    return this.http.delete(environment.backendUri + 'resa/' + id, this.config.httpOptions);
  }

  getById(id?: number): Observable<ReservationEntity> {
    return this.http.get<ReservationEntity>(environment.backendUri + 'resa/' + id, this.config.httpOptions);
  }

  add(r: ReservationEntity): Observable<any> {
    return this.http.post(environment.backendUri + 'resa', r, this.config.httpOptions);
  }

  update(r: ReservationEntity): Observable<any> {
    return this.http.put(environment.backendUri + 'resa/' + r.id, r, this.config.httpOptions);
  }
}
