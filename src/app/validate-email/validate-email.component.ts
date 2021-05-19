import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.scss']
})
export class ValidateEmailComponent implements OnInit {
  titulo = 'GardenForYou';
  error = '';
  okey = '';
  validateForm: FormGroup;
  code = "";

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.validateForm = this.formBuilder.group({
      code: ["", Validators.required]
    })
  };

  get f(){
    return this.validateForm.controls
  };

  validationCode(){
    let code = this.f.code.value;

    this.userService.confirmationEmail(code).subscribe(
      (data: any) => {
      },
      (error) => {
        if (error.status == 200) {
          this.okey = 'Tu cuenta ha sido verificada correctamente'
        } else if (error.status == 405) {
          this.error = 'La cuenta ya ha sido verificada'
        } else {
          this.error = 'Solicitud incorrecta'
        }
      }
    )
  };

  resendEmail() {
    this.userService.resendTokenEmail()
  }

  ngOnInit() {
  };

}
