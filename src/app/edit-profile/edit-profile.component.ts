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
  messsageInfo = '';

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
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    this.userService.getUser().subscribe(
      (data: any) => {
        console.log(data);
        this.infoForm.controls['firstName'].setValue(data.firstName);
        this.infoForm.controls['lastName'].setValue(data.lastName);
        this.infoForm.controls['location'].setValue(data.location);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  onSaveButton() {
    let data = {
      firstName: this.infoForm.controls['firstName'].value,
      lastName: this.infoForm.controls['lastName'].value,
      location: this.infoForm.controls['location'].value,
    };

    this.userService.updateUser(data, 'updateprofile').subscribe(
      (returnData: any) => {
        if (returnData.success != null) {
          this.messsageInfo = 'Los datos se han actualizado correctamente';
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
}
