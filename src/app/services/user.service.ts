import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  addUser(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/users`, user).pipe(
      map(data=>{
        return data
      }),
      catchError((error: any) => {
        return throwError(error.error);
      })
    );
  }
  userLogin(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/login`, user).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  getUser(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }

  updateUser(data: Object, action: string): Observable<any> {
    return this.httpClient
      .patch(`${environment.apiUrl}/users`, {
        params: { action: action },
        body: data,
      })
      .pipe(
        catchError((error) => {
          return error;
        })
      );
  }

  deleteUser(): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/users`).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
}
