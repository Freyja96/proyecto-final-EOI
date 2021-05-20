import { FormGroup } from '@angular/forms';
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

  /*
saveProduct(product: Product): Observable<any> {
  return this.httpClient.post(`${environment.apiUrl}/product`, product)
      .pipe(
        catchError(error => {
          return error;
        })
      );
}
getProduct(id: string |null): Observable<any> {
  return this.httpClient.get(`${environment.apiUrl}/product/${id}`).pipe(
    catchError(error => {
      return error;
    })
  );
}

updateProduct(product: Product): Observable<any> {
  return this.httpClient.put(`${environment.apiUrl}/product/${product._id}`, product).pipe(
    catchError(error => {
      return error;
    })
  );
}
deleteProduct(id: string): Observable<any> {
  return this.httpClient.delete(`${environment.apiUrl}/product/${id}`).pipe(
    catchError(error => {
      return error;
    })
  );
}
*/
}
