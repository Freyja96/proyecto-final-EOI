import { Category } from './../models/category.model';
import { CategoryService } from './../services/category.service';
import { User } from './../models/user.model';
import { Product } from './../models/product.model';
import { UserService } from './../services/user.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  isTheOwner = false;
  showDeleteModal = false;
  messageError = '';
  image = null;

  product: any;
  owner: any;
  productCategory: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProduct(productId).subscribe(
        (returnData: any) => {
          this.product = returnData;
          if (returnData.publisherId) {
            this.userService.getUserById(returnData.publisherId).subscribe(
              (data: any) => {
                this.owner = data;
                if (this.owner != null && this.owner.image != null) {
                  this.image = this.owner.image;
                }
                if (this.authService.isAuthenticated()) {
                  let userData = localStorage.getItem('userProfile');
                  if (userData != null) {
                    let userProfile = JSON.parse(userData);
                    if (data._id == userProfile._id) {
                      this.isTheOwner = true;
                    }
                  }
                }
              },
              (error) => {
                console.log(error);
              }
            );
          }
          if (returnData.category) {
            this.categoryService
              .getCategory(returnData.category)
              .subscribe((cat: Category) => {
                this.productCategory = cat;
              });
          }
        },
        (error) => {
          if (error.status == 500) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/404']);
          }
        }
      );
    } else {
      this.router.navigate(['/404']);
    }
  }

  goToProfile() {
    if (this.owner) {
      this.router.navigate(['user', this.owner.username]);
    }
  }

  goToEditProduct() {
    if (this.product) {
      this.router.navigate(['update/product', this.product._id]);
    }
  }

  markAsSold() {
    if (this.owner) {
      if (this.product && this.product._id) {
        if (this.product.sold) {
          this.product.sold = false;
        } else {
          this.product.sold = true;
        }
        this.productService
          .updateProduct(this.product._id, this.product)
          .subscribe(
            (returnData: any) => {
              this.ngOnInit();
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
      }
    } else {
      this.messageError = 'Este producto no es tuyo';
    }
  }

  deleteProduct() {
    this.messageError = '';
    if (this.product && this.product._id) {
      this.productService.deleteProduct(this.product._id).subscribe(
        (data: any) => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.messageError = 'No hemos podido borrar el producto';
          console.log(error.error);
        }
      );
    }
  }
}
