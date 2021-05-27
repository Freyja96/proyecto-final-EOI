import { UserService } from './../services/user.service';
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
  chatId: any = null;
  userProfile: any;
  messageError = '';
  image = null;
  chat: any = null;
  otherUser: any;

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

  messages: Array<Object> = new Array();

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService,
    private userService: UserService
  ) {
    this.activeRoute.params.subscribe((param) => {
      this.chatId = param.chatid != null ? param.chatid : null;
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    let data = localStorage.getItem('userProfile');

    if (data != null) {
      this.userProfile = JSON.parse(data);

      this.userService.getUser().subscribe(
        (data: any) => {
          this.userProfile = data;
          localStorage.setItem('userProfile', JSON.stringify(data));
        },
        (error) => {
          if (error.status == 401) {
            localStorage.clear();
          }
          console.log('Error:', error.error);
        }
      );
    }

    if (this.chatId != null) {
      this.chatService.getMessages(this.chatId).subscribe(
        (data: any) => {
          this.messages = data;
          console.log('Messages');
          console.log(data);
        },
        (error) => {
          this.messageError =
            'Hemos tenido un problema al acceder a los mensajes';
          console.log(error);
        }
      );

      this.chatService.getChat(this.chatId).subscribe(
        (data: any) => {
          this.chat = data;
          console.log('Chat');
          console.log(data);

          if (this.chat != null) {
            if (this.chat.buyerId == this.userProfile._id) {
              this.updateUser(this.chat.sellerId);
            } else if (this.chat.sellerId == this.userProfile._id) {
              this.updateUser(this.chat.buyerId);
            }
          }
        },
        (error) => {
          this.messageError = 'Hemos tenido un problema al acceder al chat';
          console.log(error);
        }
      );
    }
  }

  updateUser(userid: string) {
    this.userService.getUserById(userid).subscribe(
      (data: any) => {
        this.otherUser = data;
        console.log('Other user');
        console.log(this.otherUser);
        if (this.otherUser != null && this.otherUser.image != null) {
          this.image = this.otherUser.image;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
