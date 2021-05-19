import { AuthService } from './../services/auth/auth.service';
import { User } from './../models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  titulo = 'GardenForYou';
  loginForm: FormGroup;
  logged = true;
  error = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    let email = this.f.email.value;
    let password = this.f.password.value;

    const user: User = new User();

    user.email = email;
    user.password = password;

    this.userService.userLogin(user).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.access_token);
        this.redirectLogin();
      },
      (error) => {
        if (error.status == 500) {
          this.error = 'No se ha podido conectar con el servidor';
        } else {
          this.error = 'El email o contraseña no son correctos.';
        }
      }
    );
  }

  redirectLogin() {
    this.userService.getUser().subscribe(
      (data: any) => {
        if (data.emailVerified) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/validate']);
        }
      },
      (error) => {
        if (error.status == 500) {
          this.error = 'No se ha podido conectar con el servidor';
        } else if (error.status == 401) {
          localStorage.clear();
          this.router.navigate(['/']);
        }
      }
    );
  }

  ngOnInit() {
    if ((this.logged = this.authService.isAuthenticated())) {
      this.router.navigate(['/']);
    }
  }
}
