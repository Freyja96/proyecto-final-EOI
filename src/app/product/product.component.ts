import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  isTheOwner = true;

  product = {
    _id: 'unaid',
    publisherId: {
      _id: 'string',
      firstName: 'Pepito',
      username: 'Nombre de usuario',
      image: {
        url:
          'https://xavierferras.com/wp-content/uploads/2019/02/266-Persona.jpg',
      },
      emailVerified: true,
      location: 'Madrid',
    },
    images: [
      {
        _id: 'string',
        url:
          'https://www.hola.com/imagenes/decoracion/20200609169726/plantas-de-interior-cuidados-duren-tiempo-mc/0-833-734/trucos-plantas-interior-duren-1-z.jpg',
      },
      {
        _id: 'string',
        url:
          'https://images.pexels.com/photos/1924867/pexels-photo-1924867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        _id: 'string',
        url:
          'https://images.pexels.com/photos/4068015/pexels-photo-4068015.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
    ],
    title: 'Nombre del producto',
    price: 1.26,
    type: 'plant',
    size: null,
    publishedDate: '2019-08-24',
    description: 'Detalles del producto, origen, tipo de cuidados, etc...',
    category: {
      type: 'plant',
      category: 'Un tipo',
      subcategory: 'El subtipo',
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
