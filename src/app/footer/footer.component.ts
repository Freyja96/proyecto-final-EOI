import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  titulo = 'GardenForYou';
  logged = false;
  userProfile: any;
  image = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();

    if (this.logged) {
      this.userProfile = localStorage.getItem('userProfile');

      if (
        this.userProfile != null &&
        this.userProfile.image != null &&
        this.userProfile.image.url != null
      ) {
        this.image = this.userProfile.image.url;
      }

      if (!this.userProfile) {
        this.userService.getUser().subscribe(
          (data: any) => {
            this.userProfile = data;
            localStorage.setItem('userProfile', JSON.stringify(data));
          },
          (error) => {
            if (error.status == 401) {
              localStorage.clear();
              this.router.navigate(['/login']);
            }
            console.log('Error:', error.error);
          }
        );
      }
    }
  }
}
