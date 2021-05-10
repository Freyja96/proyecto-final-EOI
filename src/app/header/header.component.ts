import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  titulo = 'GardenForYou';
  logged = true;
  constructor(private router: Router) { }
  userProfile = {
    image: {
      url:
        'https://thispersondoesnotexist.com/image',
    }
  };
  ngOnInit() {
  }
navigateToSearch(){
  this.router.navigate(['/search'])
}
}
