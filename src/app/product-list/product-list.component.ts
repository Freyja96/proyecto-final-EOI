import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Category } from './../models/category.model';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];
  categories: Array<string> = new Array();
  subCategories: Array<string> = new Array();
  allCategories: Array<Category> = [];
  filterForm: FormGroup;
  productType: string = '';
  isPlants: boolean = false;
  imageUrl: string = '';
  title: string = 'Plantas';
  moreProducts: boolean = false;
  order: string = 'date';
  page: number = 1;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      category: new FormControl({ value: '', disabled: true }),
      subcategory: new FormControl({ value: '', disabled: true }),
      size: [''],
    });
    this.isPlants = this.router.url == '/plants';
    this.imageUrl = this.isPlants
      ? '../../assets/images/plants.jpg'
      : '../../assets/images/insets.jpg';
    this.productType = this.isPlants ? 'plant' : 'insect';
    this.title = this.isPlants ? 'Plantas' : 'Insectos';
  }

  ngOnInit() {
    this.productService.getProducts({ type: this.productType }).subscribe(
      (data: any) => {
        this.products = data;
        if (data.length >= 10) {
          this.moreProducts = true;
        }
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
    this.updateProductList();
  }

  getParams() {
    let categorySelect = this.filterForm.controls['category'].value;
    let subCategorySelect = this.filterForm.controls['subcategory'].value;

    let params: any = {
      type: this.productType,
    };

    if (categorySelect) {
      let allSubcategories = this.allCategories.filter(
        (category) => category.category == categorySelect
      );
      if (allSubcategories.length > 1 && subCategorySelect) {
        let lastFilter = allSubcategories.filter(
          (category) => category.subcategory == subCategorySelect
        );
        if (lastFilter.length > 0) {
          params.categoryId = lastFilter[0]._id;
        }
      } else if (allSubcategories.length > 0) {
        params.categoryId = allSubcategories[0]._id;
      }
    }

    if (this.isPlants && this.filterForm.controls['size'].value) {
      params.size = this.filterForm.controls['size'].value;
    }

    if (this.order.includes('Asc')) {
      params.sort = 'asc';
    }

    if (this.order.includes('date')) {
      params.orderby = 'date';
    } else {
      params.orderby = 'price';
    }

    return params;
  }

  updateProductList() {
    let params = this.getParams();

    this.productService.getProducts(params).subscribe(
      (data: any) => {
        this.products = data;
        if (data.length >= 10) {
          this.moreProducts = true;
        }
      },
      (error) => {
        this.products = [];
        console.log('Error:', error.error);
      }
    );
  }

  loadMore() {
    let params = this.getParams();

    params.page = this.page + 1;

    this.productService.getProducts(params).subscribe(
      (data: Array<Product>) => {
        this.products.concat(data);
        if (data.length >= 10) {
          this.moreProducts = true;
        }
      },
      (error) => {
        this.products = [];
        console.log('Error:', error.error);
      }
    );
  }
}
