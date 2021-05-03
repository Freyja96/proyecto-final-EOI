import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  product = {
    _id: 'unaid',
    publisherId: {
      _id: 'string',
    },
    images: [
      {
        _id: 'string',
        url:
          'https://www.hola.com/imagenes/decoracion/20200609169726/plantas-de-interior-cuidados-duren-tiempo-mc/0-833-734/trucos-plantas-interior-duren-1-z.jpg',
      },
    ],
    title: 'Nombre del pruducto',
    price: 1.26,
    type: 'plant',
    description: 'Detalles del producto, origen, tipo de cuidados, etc...',
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  goToProduct() {
    this.router.navigate(['product', this.product._id]);
  }
}
