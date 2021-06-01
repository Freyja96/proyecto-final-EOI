import { AuthService } from './../services/auth/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  mForm: FormGroup;
  logged = false;
  error = '';
  title = '../../assets/images/logotipo-gardenforyou.png';

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.mForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repitPassword: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      checkPrivacyUse: [Validators.required]
    });
  }

  isOlderThan18(date: string) {
    let currentDate = new Date();
    return (
      new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth() + 1,
        currentDate.getDate()
      ) <= new Date(date)
    );
  }

  get f() {
    return this.mForm.controls;
  }

  signUp() {
    let firstName = this.f.firstName.value;
    let email = this.f.email.value;
    let password = this.f.password.value;
    let repitPassword = this.f.repitPassword.value;
    let lastName = this.f.lastName.value;
    let dateOfBirth = this.f.dateOfBirth.value;

    if (password != repitPassword) {
      this.error = 'La contraseña tiene que ser la misma';
      return;
    }
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      this.error =
        'La contraseña tiene que tener, como mínimo, más de 8 caracteres, una letra mayúscula, una minúscula y un número';
      return;
    }
    if (this.isOlderThan18(dateOfBirth)) {
      this.error = 'Lo siento, tienes que ser mayor de edad.';
      return;
    }

    const user: User = new User();
    user.firstName = firstName;
    user.email = email;
    user.password = password;
    user.lastName = lastName;
    user.dateOfBirth = dateOfBirth;

    this.userService.addUser(user).subscribe(
      (data: any) => {
        this.router.navigate(['/login']);
      },
      (error: any) => {
        if (error.status == 500) {
          this.error = 'No se ha podido conectar con el servidor';
        } else if (error.status == 409) {
          this.error = 'Ese correo ya existe';
        } else {
          this.error = 'Falta información';
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
