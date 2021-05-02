import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit {
  products = [1, 2, 3, 5, 6, 7, 8];

  userProfile = {
    username: 'Nombre de usuario',
    image: {
      url:
        'https://xavierferras.com/wp-content/uploads/2019/02/266-Persona.jpg',
    },
    emailVerified: true,
    location: 'Madrid',
  };

  constructor() {}

  ngOnInit() {}
}
