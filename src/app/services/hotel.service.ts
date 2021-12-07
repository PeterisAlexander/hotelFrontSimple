import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HotelEntity } from '../entities/hotel.entity';

import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAll(s?: string): Observable<HotelEntity[]> {
    console.log(
      environment.backendUri + 'hotel' + (s == undefined ? '' : '?search=' + s)
    );

    return this.http.get<HotelEntity[]>(
      environment.backendUri + 'hotel' + (s == undefined ? '' : '?search=' + s) , this.config.httpOptions
    );
  }

  delete(id?: number): Observable<any> {
    return this.http.delete(environment.backendUri + 'hotel/' + id, this.config.httpOptions);
  }

  getById(id?: number): Observable<HotelEntity> {
    return this.http.get<HotelEntity>(environment.backendUri + 'hotel/' + id, this.config.httpOptions);
  }

  add(h: HotelEntity): Observable<any> {
    return this.http.post(environment.backendUri + 'hotel', h, this.config.httpOptions);
  }

  update(h: HotelEntity): Observable<any> {
    return this.http.put(environment.backendUri + 'hotel/' + h.id, h, this.config.httpOptions);
  }
}
