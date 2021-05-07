import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {

  message = "Ah pues es un buen envío";

  userProfile = {
    username: 'Sam',
    image: {
      url:
        'https://thispersondoesnotexist.com/image',
    },
    product: {title: 'Huevos de samia ricini'}
  };

  constructor() { }

  ngOnInit() {
  }

}
