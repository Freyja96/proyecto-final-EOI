import { Category } from './../models/category.model';
import { CategoryService } from './../services/category.service';
import { Product } from './../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { FirebaseStorageService } from './../services/firebase-storage.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  messageInfo = '';
  messageError = '';
  productType = '';
  productId: any = null;
  productForm: FormGroup;
  categories: Array<string> = new Array();
  subCategories: Array<string> = new Array();
  allCategories: Array<Category> = [];
  userProfile = { username: '' };
  imageList: Array<string> = new Array();

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private firebaseStorage: FirebaseStorageService
  ) {
    this.productForm = this.formBuilder.group({
      title: [''],
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
    let userData = localStorage.getItem('userProfile');
    if (userData != null) {
      this.userProfile = JSON.parse(userData);
    }

    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe(
        (returnData: Product) => {
          this.productType = returnData.type ? returnData.type : 'plant';
          this.productForm.controls['title'].setValue(returnData.title);
          this.productForm.controls['description'].setValue(
            returnData.description
          );
          this.productForm.controls['price'].setValue(returnData.price);
          this.productForm.controls['size'].setValue(
            returnData.size ? returnData.size : ''
          );

          if (returnData.images) {
            this.imageList = returnData.images;
          }

          this.updateCategories();

          if (returnData.category) {
            this.categoryService.getCategory(returnData.category).subscribe(
              (cat: Category) => {
                this.productForm.controls['category'].enable();
                this.productForm.controls['category'].setValue(cat.category);
                this.updateSubCategories();
                if (cat.subcategory) {
                  this.productForm.controls['subcategory'].enable();
                  this.productForm.controls['subcategory'].setValue(
                    cat.subcategory
                  );
                }
              },
              (error) => {}
            );
          }
        },
        (error) => {
          if (error.status == 500) {
            this.messageError =
              'No se ha podido conectar con el servidor. Intentalo de nuevo en unos minutos';
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

  updateProduct() {
    this.messageInfo = '';
    this.messageError = '';
    let userData = localStorage.getItem('userProfile');
    if (userData != null) {
      let userProfile = JSON.parse(userData);

      if (this.productType != 'plant' && this.productType != 'insect') {
        this.messageError =
          'Tienes que elegir que quieres vender. Una planta o un insecto';
        return;
      }

      let productData = {
        publisherId: userProfile._id,
        title: this.productForm.controls['title'].value,
        price: this.productForm.controls['price'].value,
        description: this.productForm.controls['description'].value,
        type: this.productType,
        size:
          this.productType == 'plant'
            ? this.productForm.controls['size'].value
            : undefined,
        category: this.productForm.controls['category'].value,
        subcategory: this.productForm.controls['subcategory'].value,
        images: this.imageList,
      };

      if (this.productId) {
        this.productService
          .updateProduct(this.productId, productData)
          .subscribe(
            (returnData: any) => {
              this.messageInfo = 'El producto se ha actualizado correctamente.';
            },
            (error) => {
              if (error.status == 500) {
                this.messageError =
                  'No se ha podido conectar con el servidor. Intentalo de nuevo en unos minutos';
              } else if (error.status == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
              } else if (error.status == 403) {
                this.router.navigate(['/']);
              }
            }
          );
      } else {
        this.productService.addProduct(productData).subscribe(
          (returnData: Product) => {
            this.router.navigate(['/product/' + returnData._id]);
          },
          (error) => {
            if (error.status == 500) {
              this.messageError =
                'No se ha podido conectar con el servidor. Intentalo de nuevo en unos minutos';
            } else if (error.status == 401) {
              localStorage.clear();
              this.router.navigate(['/login']);
            } else if (error.status == 400) {
              this.messageError = error.error;
            }
          }
        );
      }
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
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
          this.messageError =
            'No se ha podido conectar con el servidor. Intentalo de nuevo en unos minutos';
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

  uploadImage(event: any) {
    if (
      event != null &&
      event.target != null &&
      event.target.files[0] != null
    ) {
      let file = event.target.files[0];
      let fileName = file.name + '-' + this.userProfile.username;
      this.messageError = '';
      this.messageInfo = 'Se est?? guardando la imagen, espera un momento';

      this.firebaseStorage
        .uploadImage(fileName, file)
        .catch((error) => {
          this.messageError =
            'No se ha podido subir la imagen. El tama??o maximo es 2Mb';
          this.messageInfo = '';
          console.log(error);
        })
        .then(() => {
          this.firebaseStorage
            .getRefImage(fileName)
            .getDownloadURL()
            .subscribe((url) => {
              this.imageList.push(url);
              this.messageInfo =
                'Imagen subida correctamente. Recuerda guardar los cambios';
            });
        });
    }
  }

  deleteImage(url: string) {
    this.messageError = '';
    this.imageList = this.imageList.filter((image) => image != url);
  }
}
