import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
 condition: boolean = true;

 /*
 isNew = true;
 id: string | null = "";
 formGroup: FormGroup;

 constructor(private productService: ProductService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private location: Location) {
  this.router.events.subscribe((currentUrl) => {
    if (currentUrl instanceof NavigationEnd){
      this.id = activatedRoute.snapshot.paramMap.get("id")
      if(this.id == "new"){
        this.isNew = true
        console.log("Añadir nuevo producto")
      } else {
        this.isNew = false
        console.log("Llamar al servicio de GET/:id")
      }
    }
  })
}
*/
  ngOnInit() {
    /*
    if(!this.isNew){
      this.getProduct()
    }else{
      console.log("Añadir nuevo producto")
    }
    */
  }
/*
  getProduct() {
    this.productService.getProduct(this.id).subscribe(data => {
      this.product = data
      this.form.patchValue({
        title: this.product.title,
        type: this.product.type,
        image: this.product.image,
        size: this.product.size,
        price: this.product.price
      })
    },
      error => {
      console.log("Error:", error);
      }
    );
  }

  save(){
    if(this.isNew){
      this.saveProduct()
    } else {
      this.updateProduct()
    }
  }

  saveProduct(){
    const product: Product = new Product()
    product.title = this.form.controls.title.value
    product.type = this.form.controls.type.value

    this.productService.saveProduct(product).subscribe(
      data => {
        this.location.back()
        console.log("Producto creado satisfactoriamente")
      },
      error => {
      console.log("Error:", error);
      }
    );
  }
  updateProduct() {
    const product: Product = new Product()
      product._id = this.id || ""
      product.title = this.form.controls.title.value
      product.type = this.form.controls.type.value
      product.image = this.form.controls.image.value
      product.size = this.form.controls.size.value
      product.price = this.form.controls.price.value

    this.productService.updateProduct(product).subscribe(data => {
      console.log("Buen trabajo")
      this.location.back()
    },
    error => {
      console.log("Error:", error);
    }
    );
  }
  deleteProduct() {
    this.productService.deleteProduct(this.id || "").subscribe(
      data => {
        this.product = data
        console.log(this.product)
        this.location.back()
      },
      error => {
      console.log("Error:", error);
      }
    );
  }
  */
}
