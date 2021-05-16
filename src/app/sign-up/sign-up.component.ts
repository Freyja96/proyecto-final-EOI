import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  titulo = 'GardenForYou';
  mForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private user: User,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient)
    {
    this.mForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      lastName: ["", Validators.required],
      dateOfBirth: ["", Validators.required]
    })
   }

   addUser(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user`, user).pipe(
      catchError((error) => {
        return error;
      })
    );
  }
  ngOnInit() {
  }

}
