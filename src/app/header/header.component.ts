import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  titulo = 'GardenForYou';
  logged = false;
  searchProduct = '';
  image = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  userProfile: any;

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

  navigateToSearch() {
    this.router.navigate(['/search']);
  }
}
