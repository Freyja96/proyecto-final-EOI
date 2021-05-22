import { Category } from './../models/category.model';
import { CategoryService } from './../services/category.service';
import { Product } from './../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  messageError = '';
  productType = '';
  productId: any = null;
  productForm: FormGroup;
  categories: Array<string> = new Array();
  subCategories: Array<string> = new Array();
  allCategories: Array<Category> = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productServide: ProductService
  ) {
    this.productForm = this.formBuilder.group({
      tittle: [''],
      description: [''],
      price: [''],
      category: new FormControl({ value: '', disabled: true }),
      subcategory: new FormControl({ value: '', disabled: true }),
      size: [''],
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productServide.getProduct(this.productId).subscribe(
        (returnData: Product) => {
          console.log(returnData);
        },
        (error) => {
          if (error.status == 500) {
            this.messageError = 'No se ha podido conectar con el servidor';
          } else if (error.status == 401) {
            localStorage.clear();
            this.router.navigate(['/login']);
          } else if (error.status == 404) {
            this.router.navigate(['/404']);
          }
        }
      );
    }
  }

  setProductType(type: string) {
    this.productType = type;
    this.updateCategories();
  }

  updateCategories() {
    if (this.productType) {
      this.categoryService.getCategories(this.productType).subscribe(
        (returnData: Array<Category>) => {
          if (returnData) {
            this.allCategories = returnData;
            this.categories = [];
            this.subCategories = [];
            this.productForm.controls['subcategory'].disable();
            returnData.forEach((category) => {
              if (
                category.category &&
                category.category.length > 0 &&
                !this.categories.includes(category.category)
              ) {
                this.categories.push(category.category);
              }
            });
            if (this.categories.length == 0) {
              this.productForm.controls['category'].disable();
            } else {
              this.productForm.controls['category'].enable();
            }
          }
        },
        (error) => {
          this.messageError = 'No se ha podido conectar con el servidor';
        }
      );
    }
  }

  updateSubCategories() {
    let categorySelect = this.productForm.controls['category'].value;
    if (categorySelect) {
      let allSubcategories = this.allCategories
        .filter(
          (category) =>
            category.category == categorySelect && category.subcategory
        )
        .map((category) => {
          return category.subcategory;
        });
      this.subCategories = allSubcategories;
    }
    if (this.subCategories.length == 0) {
      this.productForm.controls['subcategory'].disable();
    } else {
      this.productForm.controls['subcategory'].enable();
    }
  }
}
