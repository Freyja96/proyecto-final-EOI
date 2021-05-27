import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChatService } from './../services/chat.service';
import { AuthService } from './../services/auth/auth.service';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {
  chats: Array<Object> = new Array();

  constructor(
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    this.chatService.getChats().subscribe(
      (data: any) => {
        this.chats = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
