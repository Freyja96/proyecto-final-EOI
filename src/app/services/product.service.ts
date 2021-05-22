import { Product } from './../models/product.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/products`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getProduct(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/products/${id}`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  addProduct(data: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/products`, data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.httpClient
      .put(`${environment.apiUrl}/products/${id}`, data)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/products/${id}`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
