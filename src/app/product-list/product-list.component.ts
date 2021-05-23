import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Category } from './../models/category.model';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products = [];
  categories: Array<string> = new Array();
  subCategories: Array<string> = new Array();
  allCategories: Array<Category> = [];
  filterForm: FormGroup;

  productType = '';
  isPlants = false;
  imageUrl = '';
  title = 'Plantas';

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      category: new FormControl({ value: '', disabled: true }),
      subcategory: new FormControl({ value: '', disabled: true }),
    });
    this.isPlants = this.router.url == '/plants' ? true : false;
    this.imageUrl = this.isPlants
      ? '../../assets/images/plants.jpg'
      : '../../assets/images/insets.jpg';
    this.productType = this.isPlants ? 'plant' : 'insect';
    this.title = this.isPlants ? 'Plantas' : 'Insectos';
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        this.updateCategories();
      },
      (error) => {
        console.log('Error:', error.error);
      }
    );
  }

  updateCategories() {
    if (this.productType) {
      this.categoryService
        .getCategories(this.productType)
        .subscribe((returnData: Array<Category>) => {
          if (returnData) {
            this.allCategories = returnData;
            this.categories = [];
            this.subCategories = [];
            this.filterForm.controls['subcategory'].disable();
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
              this.filterForm.controls['category'].disable();
            } else {
              this.filterForm.controls['category'].enable();
            }
          }
        });
    }
  }

  updateSubCategories() {
    let categorySelect = this.filterForm.controls['category'].value;
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
      this.filterForm.controls['subcategory'].disable();
    } else {
      this.filterForm.controls['subcategory'].enable();
    }
  }
}
