import { Product } from './../models/product.model';
import { Router } from '@angular/router';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent implements OnInit {
  @Input() chat: any;

  image?: any = null;
  userProfile?: User;
  product?: Product;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    let data = localStorage.getItem('userProfile');
    if (data != null) {
      let userData = JSON.parse(data);
      if (this.chat.buyerId == userData._id) {
        this.updateUser(this.chat.sellerId);
      } else if (this.chat.sellerId == userData._id) {
        this.updateUser(this.chat.buyerId);
      }
    } else {
      this.router.navigate(['/login']);
    }

    this.productService.getProduct(this.chat.productId).subscribe(
      (data: any) => {
        this.product = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateUser(userid: string) {
    this.userService.getUserById(userid).subscribe(
      (data: any) => {
        this.userProfile = data;
        if (this.userProfile != null && this.userProfile.image != null) {
          this.image = this.userProfile.image;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openChat() {
    this.router.navigate(['chat', this.chat._id]);
  }
}
