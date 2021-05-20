import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  titulo = 'GardenForYou';
  logged = false;
  image = null;
  @Input() userProfile: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();

    if (this.logged) {
      if (this.userProfile != null && this.userProfile.image != null) {
        this.image = this.userProfile.image;
      }
    }
  }
}
