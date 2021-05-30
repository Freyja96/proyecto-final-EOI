import { ChatService } from './../services/chat.service';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss'],
})
export class ChatInfoComponent implements OnInit, OnChanges {
  userProfile: any;

  image = '../../assets/images/no-image.jpg';

  @Input() product: any;
  @Input() chatid: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    if (this.product.images != null && this.product.images.length > 0) {
      this.image = this.product.images[0];
    }

    let data = localStorage.getItem('userProfile');
    if (data != null) {
      this.userProfile = JSON.parse(data);
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  goToProduct() {
    this.router.navigate(['product', this.product._id]);
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

  deleteChat() {
    if (this.chatid.length > 0) {
      this.chatService.deleteChat(this.chatid).subscribe(
        (returnData: any) => {
          this.router.navigate(['/chat']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
