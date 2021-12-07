import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientEntity } from '../entities/client.entity';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  getAll(s?: string): Observable<ClientEntity[]> {
    console.log(
      environment.backendUri + 'client' + (s == undefined ? '' : '?search=' + s)
    );

    return this.http.get<ClientEntity[]>(
      environment.backendUri + 'client' + (s == undefined ? '' : '?search=' + s) , this.config.httpOptions
    );
  }

  delete(id?: number): Observable<any> {
    return this.http.delete(environment.backendUri + 'client/' + id, this.config.httpOptions);
  }

  getById(id?: number): Observable<ClientEntity> {
    return this.http.get<ClientEntity>(environment.backendUri + 'client/' + id, this.config.httpOptions);
  }

  add(c: ClientEntity): Observable<any> {
    return this.http.post(environment.backendUri + 'client', c, this.config.httpOptions);
  }

  update(c: ClientEntity): Observable<any> {
    return this.http.put(environment.backendUri + 'client/' + c.id, c, this.config.httpOptions);
  }
}
