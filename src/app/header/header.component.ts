import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title = '../../assets/images/logotipo GardenForYou.png';
  logo = '../../assets/images/GardenForYou Logo final.png';
  logged = false;
  searchProduct = '';
  image = null;
  @Input() userProfile: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();

    if (this.logged) {
      if (this.userProfile != null && this.userProfile.image != null) {
        this.image = this.userProfile.image;
      }
    }
  }

  navigateToSearch() {
    if (this.searchProduct.length > 0) {
      this.router.navigate(['/search'], {
        queryParams: { search: this.searchProduct },
      });
      this.searchProduct = '';
    }
  }

  goToProfile() {
    this.router.navigate(['/user/' + this.userProfile.username]);
  }
}
