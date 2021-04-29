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
        console.log("Añadir nueva serie")
      } else {
        this.isNew = false
        console.log("Llamar al servicio de GET/:id")
      }
    }
  })
}
*/
  ngOnInit() {}
/*
  saveSerie() {
    this.productService.saveProduct(this.id).subscribe(data => {
      this.product = data
    },
      error => {
      console.log("Error:", error);
      }
    );
  }
  */
}
