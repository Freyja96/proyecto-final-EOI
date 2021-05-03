import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products = [1, 2, 3, 5, 6, 7, 8];
  categories = ['una', 'otra', 'otra mas'];
  formats = ['Bulbo', 'Semilla', 'Planta'];

  isPlants = false;
  imageUrl = '';
  title = 'Plantas';

  constructor(private router: Router) {
    this.isPlants = this.router.url == '/plants' ? true : false;
    this.imageUrl = this.isPlants
      ? '../../assets/images/plants.jpg'
      : '../../assets/images/insets.jpg';
    this.title = this.isPlants ? 'Plantas' : 'Insectos';
  }

  ngOnInit() {}
}
