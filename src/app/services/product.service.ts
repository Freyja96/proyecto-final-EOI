import { Product } from './../models/product.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private httpClient: HttpClient) { }
/*
saveProduct(product: Product): Observable<any> {
  return this.httpClient.post(`${environment.apiUrl}/product`, product)
      .pipe(
        catchError(error => {
          return error;
        })
      );
}

updateProduct(serie: Product): Observable<any> {
  return this.httpClient.put(`${environment.apiUrl}/serie/${serie._id}`, serie).pipe(
    catchError(error => {
      return error;
    })
  );
}
*/
}
