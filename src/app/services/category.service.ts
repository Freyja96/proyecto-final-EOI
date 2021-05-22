import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories(type: string): Observable<any> {
    return this.httpClient
      .get(`${environment.apiUrl}/categories?type=${type}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
