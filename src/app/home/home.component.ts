import { ProductComponent } from './../product/product.component';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  titulo="MyGardenToYours";
  constructor() { }

  ngOnInit() {
  }

}
