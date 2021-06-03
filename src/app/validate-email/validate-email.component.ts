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
  okeyMsg = '';
  validateForm: FormGroup;
  code = "";
  btnDisabled = false;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder, private router: Router) {
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
        this.okeyMsg = 'Tu cuenta ha sido verificada correctamente';
        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status == 405) {
          this.error = 'La cuenta ya ha sido verificada'
        } else {
          this.error = 'El código no es correcto, inténtalo de nuevo'
        }
      }
    )
  };

  resendEmail() {
    this.userService.resendTokenEmail().subscribe(
      (data: any) => {
        console.log(data);
        this.okeyMsg = 'Se ha reenviado correctamente, esta operación puede tardar unos minutos';
        this.btnDisabled = true;
        setTimeout(() => {
        this.btnDisabled = false;
         }, 40000);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  ngOnInit() {

  };

}
