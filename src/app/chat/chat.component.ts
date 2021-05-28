import { ProductService } from './../services/product.service';
import { Product } from './../models/product.model';
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
  messageInput = '';
  product?: Product;
  showMenu: boolean = false;

  messages: Array<Object> = new Array();

  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService,
    private userService: UserService,
    private productService: ProductService
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
      setInterval(() => this.updateChat(), 1000 * 60);
      this.updateChat();
    }
  }

  updateChat() {
    this.chatService.getMessages(this.chatId).subscribe(
      (data: any) => {
        this.messages = data;
      },
      (error) => {
        this.messageError =
          'Hemos tenido un problema al acceder a los mensajes';
        console.log(error);
        this.router.navigate(['/chat']);
      }
    );

    this.chatService.getChat(this.chatId).subscribe(
      (data: any) => {
        this.chat = data;
        if (this.chat != null) {
          if (this.chat.buyerId == this.userProfile._id) {
            this.updateUser(this.chat.sellerId);
          } else if (this.chat.sellerId == this.userProfile._id) {
            this.updateUser(this.chat.buyerId);
          }
          this.updateProduct(this.chat.productId);
        }
      },
      (error) => {
        this.messageError = 'Hemos tenido un problema al acceder al chat';
        console.log(error);
      }
    );
  }

  updateProduct(productId: string) {
    this.productService.getProduct(productId).subscribe(
      (data: any) => {
        this.product = data;
      },
      (error) => {
        this.messageError =
          'Hemos tenido un problema al acceder a los datos del producto';
        console.log(error);
      }
    );
  }

  updateUser(userid: string) {
    this.userService.getUserById(userid).subscribe(
      (data: any) => {
        this.otherUser = data;
        if (this.otherUser != null && this.otherUser.image != null) {
          this.image = this.otherUser.image;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sendMessage() {
    if (this.messageInput.length > 0 && this.chatId != null) {
      this.chatService.addMessage(this.chatId, this.messageInput).subscribe(
        (data: any) => {
          this.messageInput = '';
          this.updateChat();
        },
        (error) => {
          this.messageError = 'No se ha podido mandar el mensaje';
          console.log(error);
        }
      );
    }
  }

  goToProduct() {
    if (this.product) {
      this.router.navigate(['product', this.product._id]);
    }
  }

  deleteChat() {
    if (this.chatId) {
      this.chatService.deleteChat(this.chatId).subscribe(
        (returnData: any) => {
          this.router.navigate(['/chat']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  markAsSold() {
    if (this.product && this.product._id) {
      if (this.product.sold) {
        this.product.sold = false;
      } else {
        this.product.sold = true;
      }
      this.productService
        .updateProduct(this.product._id, this.product)
        .subscribe(
          (returnData: any) => {},
          (error) => {
            if (error.status == 401) {
              localStorage.clear();
              this.router.navigate(['/login']);
            } else if (error.status == 403) {
              this.router.navigate(['/']);
            }
          }
        );
    }
  }
}
