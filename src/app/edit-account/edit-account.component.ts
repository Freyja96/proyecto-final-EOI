import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit {
  userPassword = '';
  titulo = 'GardenForYou';
  messsageInfo = '';
  messageError = '';
  dateOfBirth = '';

  dateForm: FormGroup;
  emailForm: FormGroup;
  passForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.dateForm = this.formBuilder.group({
      dateOfBirth: [''],
    });
    this.emailForm = this.formBuilder.group({
      email: [''],
      repeatEmail: [''],
    });
    this.passForm = this.formBuilder.group({
      password: [''],
      repeatPassword: [''],
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.userService.getUser().subscribe(
      (data: any) => {
        localStorage.setItem('userProfile', JSON.stringify(data));
        this.dateOfBirth = data.dateOfBirth;
        this.emailForm.controls['email'].setValue(data.email);
      },
      (error) => {
        if (error.status == 500) {
          this.messageError = 'No se ha podido conectar con el servidor';
        } else if (error.status == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    );
  }

  updateDate() {
    this.messsageInfo = '';
    this.messageError = '';

    let newDate = this.dateForm.controls['dateOfBirth'].value;
    let currentDate = new Date();

    if (
      new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth() + 1,
        currentDate.getDate()
      ) <= new Date(newDate)
    ) {
      this.messageError = 'El minimo de edad es 18 años';
      return;
    }

    this.userService
      .updateUser({ dateOfBirth: newDate }, 'updatedate')
      .subscribe(
        (returnData: any) => {
          if (returnData.success != null) {
            this.messsageInfo =
              'Los fecha de nacimiento se ha actualizado correctamente';
          }
        },
        (error) => {
          if (error.status == 500) {
            this.messageError = 'No se ha podido conectar con el servidor';
          } else if (error.status == 401) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        }
      );
  }

  updateEmail() {
    this.messsageInfo = '';
    this.messageError = '';
    let newEmail = this.emailForm.controls['email'].value;
    let repeatEmail = this.emailForm.controls['repeatEmail'].value;

    if (newEmail != repeatEmail) {
      this.messageError = 'Los correos deben ser iguales';
      return;
    }

    this.userService.updateUser({ email: newEmail }, 'updateemail').subscribe(
      (returnData: any) => {
        this.emailForm.controls['repeatEmail'].setValue('');
        if (returnData.success != null) {
          this.messsageInfo = 'El correo se ha actualizado correctamente';
        }
      },
      (error) => {
        if (error.status == 500) {
          this.messageError = 'No se ha podido conectar con el servidor';
        } else if (error.status == 409) {
          this.messageError = 'Este correo ya existe';
        } else if (error.status == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    );
  }

  updatePass() {
    this.messsageInfo = '';
    this.messageError = '';

    let password = this.passForm.controls['password'].value;
    let repeatPassword = this.passForm.controls['repeatPassword'].value;

    if (password != repeatPassword) {
      this.messageError = 'Las contraseñas deben ser iguales';
      return;
    }

    this.userService.updateUser({ password: password }, 'updatepass').subscribe(
      (returnData: any) => {
        this.passForm.controls['password'].setValue('');
        this.passForm.controls['repeatPassword'].setValue('');
        if (returnData.success != null) {
          this.messsageInfo = 'La contraseña se ha actualizado correctamente';
        }
      },
      (error) => {
        if (error.status == 500) {
          this.messageError = 'No se ha podido conectar con el servidor';
        } else if (error.status == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
