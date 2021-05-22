import { Product } from './../models/product.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  productType = '';
  productId: any = null;
  productForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      tittle: [''],
      description: [''],
      price: [''],
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  setProductType(type: string) {
    this.productType = type;
  }
}
