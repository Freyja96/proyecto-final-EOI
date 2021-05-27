import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  getChats(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/chats`).pipe(
      map((data) => {
        return data;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  makeNewChat(idProduct: string): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/chats`, { idProduct: idProduct })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  getMessages(chatId: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/chats/${chatId}`).pipe(
      map((data) => {
        return data;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  addMessages(chatId: string, message: string): Observable<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/chats/${chatId}`, { message: message })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  deleteChat(chatId: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/chats/${chatId}`).pipe(
      map((data) => {
        return data;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
}
