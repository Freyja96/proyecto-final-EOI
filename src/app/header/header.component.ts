import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
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
  @Input() userProfile: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();

    if (this.logged) {
      if (
        this.userProfile != null &&
        this.userProfile.image != null &&
        this.userProfile.image.url != null
      ) {
        this.image = this.userProfile.image.url;
      }
    }
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }
}
