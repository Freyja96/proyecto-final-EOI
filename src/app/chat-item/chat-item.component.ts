import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {

  message = "Ah pues es un buen envío";

  userProfile = {
    username: 'Marina',
    image: {
      url:
        'https://xavierferras.com/wp-content/uploads/2019/02/266-Persona.jpg',
    },
    product: {title: 'Huevos de samia ricini'}
  };

  constructor() { }

  ngOnInit() {
  }

}
