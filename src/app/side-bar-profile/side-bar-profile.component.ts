import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-profile',
  templateUrl: './side-bar-profile.component.html',
  styleUrls: ['./side-bar-profile.component.scss'],
})
export class SideBarProfileComponent implements OnInit {
  userProfile: any;
  logged = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();

    if (this.logged) {
      let data = localStorage.getItem('userProfile');

      if (data != null) {
        this.userProfile = JSON.parse(data);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  goToProfile() {
    console.log(this.userProfile);
    this.router.navigate(['/user/' + this.userProfile.username]);
  }
}
