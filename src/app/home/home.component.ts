import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  titulo="GardenForYou";
  logged = false;
  products = [1, 2, 3, 4, 5, 6, 7, 8];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.logged = this.authService.isAuthenticated();
    //this.loadProduct()
  }
/*
  updateSearch(event: any){
    this.searchProduct=event.target.value
    this.loadProducts()
  }

  loadProducts(){
    const params = this.searchProduct

    this.productService.getProducts(params).subscribe(
      (data: Product[]) => {
        this.products = data
        console.log(data)
      },
      error => {
        console.log("Error:", error);
      }
    );
  }
*/
}
