import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  titulo = 'GardenForYou';
  logged = false;
  searchProduct= "";

  constructor(private router: Router, private authService: AuthService) { }

  userProfile = {
    image: {
      url:
        'https://thispersondoesnotexist.com/image',
    }
  };

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();
  }

navigateToSearch(){
  this.router.navigate(['/search'])
}
}
