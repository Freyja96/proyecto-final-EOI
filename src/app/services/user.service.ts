import { User } from './../models/user.model';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private httpClient: HttpClient) { }

postUser(user: User): Observable<any> {
  return this.httpClient.post(`${environment.apiUrl}/user`, user)
      .pipe(
        catchError(error => {
          return error;
        })
      );
}
}
