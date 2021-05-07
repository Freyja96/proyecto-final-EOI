import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {

  userProfile = {
    username: 'Max',
    image: {
      url:
        'https://thispersondoesnotexist.com/image',
    },
    emailVerified: true,
    location: 'Albacete',
  };

  product = {
    _id: 'otraid',
    publisherId: {
      _id: 'string',
    },
    images:
      {
        url:
          'https://www.hola.com/imagenes/decoracion/20200609169726/plantas-de-interior-cuidados-duren-tiempo-mc/0-833-734/trucos-plantas-interior-duren-1-z.jpg',
      },
    title: 'Planta',
    price: 10,
    type: 'plant',
    description: 'No sé qué planta es.',
  };

  constructor() { }

  ngOnInit() {
  }

}
