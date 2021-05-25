import { ProductService } from './../services/product.service';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  titulo = 'GardenForYou';
  logged = false;
  products = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();
    this.productService.getProducts(null).subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => {
        console.log('Error:', error.error);
      }
    );
  }
}
