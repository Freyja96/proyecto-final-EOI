import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chatId = null;
  userId = 'unaid12345';

  otherUser = {
    username: 'Sam',
    image: {
      url: 'https://thispersondoesnotexist.com/image',
    },
    product: { title: 'Huevos de samia ricini' },
  };

  messages = [
    {
      _id: 'string',
      chatId: 'string',
      senderId: 'unaid12345',
      text: 'Un texto',
      date: '2019-08-24T11:15:22Z',
      hasRead: true,
    },
    {
      _id: 'string',
      chatId: 'string',
      senderId: 'string',
      text: 'Otro Texto',
      date: '2019-08-24T12:15:22Z',
      hasRead: true,
    },
    {
      _id: 'string',
      chatId: 'string',
      senderId: 'string',
      text: 'asdasd',
      date: '2019-08-24T13:15:22Z',
      hasRead: true,
    },
    {
      _id: 'string',
      chatId: 'string',
      senderId: 'unaid12345',
      text: 'entonces lo vendes o no',
      date: '2019-08-24T14:15:22Z',
      hasRead: true,
    },
    {
      _id: 'string',
      chatId: 'string',
      senderId: 'string',
      text: 'pues no se',
      date: '2019-08-24T15:15:22Z',
      hasRead: true,
    },
    {
      _id: 'string',
      chatId: 'string',
      senderId: 'unaid12345',
      text: 'pues dime',
      date: '2019-08-24T16:15:22Z',
      hasRead: true,
    },
  ];

  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((param) => {
      this.chatId = param.chatid ? param.chatid : '';
    });
  }

  ngOnInit(): void {}
}
