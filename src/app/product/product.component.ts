import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product = {
    _id: 'string',
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

  constructor() {}

  ngOnInit() {}
}
