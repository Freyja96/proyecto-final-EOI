import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  titulo="GardenForYou";
  logged = false;

  constructor(private authService: AuthService) { }

  userProfile = {
    image: {
      url:
        'https://thispersondoesnotexist.com/image',
    }
  };
  ngOnInit() {
    this.logged = this.authService.isAuthenticated()
  }

}
