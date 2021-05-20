import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  infoForm: FormGroup;
  imageForm: FormGroup;
  messageInfo = '';
  messageError = '';
  image = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.infoForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      location: [''],
    });
    this.imageForm = this.formBuilder.group({
      image: null,
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.userService.getUser().subscribe(
      (data: any) => {
        if (data != null) {
          localStorage.setItem('userProfile', JSON.stringify(data));

          this.infoForm.controls['firstName'].setValue(data.firstName);
          this.infoForm.controls['lastName'].setValue(data.lastName);
          this.infoForm.controls['location'].setValue(data.location);

          if (data.image != null && data.image.url != null) {
            this.image = data.image.url;
          }
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

  onSaveButton() {
    let data = {
      firstName: this.infoForm.controls['firstName'].value,
      lastName: this.infoForm.controls['lastName'].value,
      location: this.infoForm.controls['location'].value,
    };
    this.messageInfo = '';
    this.messageError = '';

    this.userService.updateUser(data, 'updateprofile').subscribe(
      (returnData: any) => {
        if (returnData.success != null) {
          this.messageInfo = 'Los datos se han actualizado correctamente';
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

  updateImage() {
    console.log(this.imageForm.controls['image'].value);
  }
}
