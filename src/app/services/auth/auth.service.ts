import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || '';

    const decoded = this.jwtHelper.decodeToken(token);
    console.log(decoded);
    return !this.jwtHelper.isTokenExpired(token);
  }
}
