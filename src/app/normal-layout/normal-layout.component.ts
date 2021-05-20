import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: ['./normal-layout.component.scss'],
})
export class NormalLayoutComponent implements OnInit {
  userProfile: any;
  logged = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();

    if (this.logged) {
      let data = localStorage.getItem('userProfile');

      if (data != null) {
        this.userProfile = JSON.parse(data);
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
            }
            console.log('Error:', error.error);
          }
        );
      }
    }
  }
}
