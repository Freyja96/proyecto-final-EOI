import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  chats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  constructor() { }

  ngOnInit() {
  }

}
