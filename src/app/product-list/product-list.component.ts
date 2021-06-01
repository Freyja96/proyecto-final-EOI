import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Category } from './../models/category.model';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
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
  isSearch: boolean = false;
  imageUrl: string = '';
  title: string = 'Plantas';
  moreProducts: boolean = false;
  order: string = 'date';
  page: number = 1;
  filter: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.filterForm = this.formBuilder.group({
      category: new FormControl({ value: '', disabled: true }),
      subcategory: new FormControl({ value: '', disabled: true }),
      size: [''],
    });
    this.isSearch = this.router.url.includes('/search');
    this.isPlants = this.router.url.includes('/plants');
    this.imageUrl = this.isPlants
      ? '../../assets/images/plants.jpg'
      : '../../assets/images/insets.jpg';
    this.productType = this.isSearch ? '' : this.isPlants ? 'plant' : 'insect';
    this.title = this.isSearch
      ? 'Busqueda'
      : this.isPlants
      ? 'Plantas'
      : 'Insectos';

      router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.route.params.subscribe((param) => {
            this.ngOnInit();
          });
        }
      });
  }

  ngOnInit() {
    this.filter = {};
    this.route.queryParams.subscribe(params => {
      if (params.search) {
        this.filter.title = params.search;
      }
    });
    if (!this.filter.title) {
      this.filter.type = this.productType;
    }

    console.log(this.filter);
    this.productService.getProducts(this.filter).subscribe(
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

  changeType(type: string) {
    if (this.filter.title != null) {
      this.productType = type == 'plants' ? 'plant' : 'insect';
      this.updateCategories();
    } else {
      this.router.navigate(['/' + type]);
    }
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

  updateFilter() {
    let categorySelect = this.filterForm.controls['category'].value;
    let subCategorySelect = this.filterForm.controls['subcategory'].value;

    this.filter.type = this.productType;

    if (categorySelect) {
      let allSubcategories = this.allCategories.filter(
        (category) => category.category == categorySelect
      );
      if (allSubcategories.length > 1 && subCategorySelect) {
        let lastFilter = allSubcategories.filter(
          (category) => category.subcategory == subCategorySelect
        );
        if (lastFilter.length > 0) {
          this.filter.categoryId = lastFilter[0]._id;
        }
      } else if (allSubcategories.length > 0) {
        this.filter.categoryId = allSubcategories[0]._id;
      }
    }

    if (this.isPlants && this.filterForm.controls['size'].value) {
      this.filter.size = this.filterForm.controls['size'].value;
    }

    if (this.order.includes('Asc')) {
      this.filter.sort = 'asc';
    }

    if (this.order.includes('date')) {
      this.filter.orderby = 'date';
    } else {
      this.filter.orderby = 'price';
    }
  }

  updateProductList() {
    this.updateFilter();
    console.log(this.filter);
    this.productService.getProducts(this.filter).subscribe(
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
    this.filter.page = this.page + 1;

    this.productService.getProducts(this.filter).subscribe(
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
