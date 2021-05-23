import { FirebaseStorageService } from './../services/firebase-storage.service';
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
  userProfile: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private firebaseStorage: FirebaseStorageService
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
          this.userProfile = data;
          this.infoForm.controls['firstName'].setValue(data.firstName);
          this.infoForm.controls['lastName'].setValue(data.lastName);
          this.infoForm.controls['location'].setValue(data.location);

          if (data.image != null && data.image != null) {
            this.image = data.image;
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

  uploadImage(event: any) {
    if (
      event != null &&
      event.target != null &&
      event.target.files[0] != null
    ) {
      let file = event.target.files[0];
      let fileName = file.name + '-' + this.userProfile.username;
      this.messageInfo = 'Se está guardando la imagen, espera un momento';

      if (this.image != null) {
        this.firebaseStorage.deleteImage(this.image);
      }

      this.firebaseStorage
        .uploadImage(fileName, file)
        .catch((error) => {
          this.messageError =
            'No se ha podido subir la imagen. El tamaño maximo es 1Mb';
          this.messageInfo = '';
          console.log(error);
        })
        .then(() => {
          this.firebaseStorage
            .getRefImage(fileName)
            .getDownloadURL()
            .subscribe((url) => {
              this.image = url;
              this.updateProfileImage(url);
            });
        });
    }
  }

  updateProfileImage(url: string) {
    this.messageInfo = '';
    this.messageError = '';

    if (url != null) {
      this.userService.updateUser({ image: url }, 'updateimage').subscribe(
        (returnData: any) => {
          if (returnData.success != null) {
            this.messageInfo = 'Los foto se ha actualizado correctamente';
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
}
