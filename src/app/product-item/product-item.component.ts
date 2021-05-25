import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;
  image:any = null;

  constructor(private router: Router) {
    this.image = '../../assets/images/no-image.jpg'

  }

  ngOnInit() {
    if(this.product.images.length!=0){
      this.image=this.product.images[0];
    }
  }

  goToProduct() {
    this.router.navigate(['product', this.product._id]);
  }
}
