import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;
  userProduct: any = null;
  image = null;

  constructor(private router: Router) {}

  ngOnInit() {
    if(this.userProduct != null && this.userProduct.image != null && this.userProduct.image.url != null) {
      this.image = this.userProduct.image.url;
    }
  }

  goToProduct() {
    this.router.navigate(['product', this.product._id]);
  }
  }
