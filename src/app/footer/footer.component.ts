import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnChanges {
  title = '../../assets/images/logotipo-gardenforyou.png';
  logged = false;
  image = null;
  @Input() userProfile: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();

    if (this.logged) {
      if (this.userProfile != null && this.userProfile.image != null) {
        this.image = this.userProfile.image;
      }
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }
}
