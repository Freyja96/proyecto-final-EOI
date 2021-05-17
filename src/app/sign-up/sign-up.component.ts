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
    private formBuilder: FormBuilder)
    {
    this.mForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      lastName: ["", Validators.required],
      dateOfBirth: ["", Validators.required]
    })
   }

   get f(){
    return this.mForm.controls
  }

   signUp(){
      let firstName = this.f.firstName.value
      let email = this.f.email.value
      let password = this.f.password.value
      let lastName = this.f.lastName.value
      let dateOfBirth = this.f.dateOfBirth.value

      const user: User = new User()

      user.firstName = firstName
      user.email = email
      user.password = password
      user.lastName = lastName
      user.dateOfBirth = dateOfBirth

      this.userService.addUser(user).subscribe((data: any) => {
        this.router.navigate(["/login"])
      },
        error => {
          console.log("Error:", error);
        }
      );
   }

  ngOnInit() {
  }

}
