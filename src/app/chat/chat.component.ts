import { ChatService } from './../services/chat.service';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chatId = null;
  userId = 'unaid12345';
  logged = true;

  product = {
    idPublisher: 'unaid12345',
    image: 'http://example.com',
    title: 'string',
    specie: 'string',
    size: 'string',
    egg: true,
    price: 0,
    climate: 'string',
    type: 'plant',
    description: 'string',
  };

  otherUser = {
    username: 'Sam',
    image: {
      url: 'https://thispersondoesnotexist.com/image',
    },
    product: { title: 'Huevos de samia ricini' },
  };

  messages: Array<Object> = new Array();

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService
  ) {
    this.activeRoute.params.subscribe((param) => {
      this.chatId = param.chatid != null ? param.chatid : null;
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    this.chatService.getChats().subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
