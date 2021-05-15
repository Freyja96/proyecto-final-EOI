import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  titulo = 'GardenForYou';
  logged = true;
  searchProduct= "";

  constructor(private router: Router) { }

  userProfile = {
    image: {
      url:
        'https://thispersondoesnotexist.com/image',
    }
  };

  ngOnInit() {
   //this.loadProducts()
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
navigateToSearch(){
  this.router.navigate(['/search'])
}
}
