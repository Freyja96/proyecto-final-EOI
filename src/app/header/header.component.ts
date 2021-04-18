import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  titulo = 'MyGardenToYours';

  constructor(private router: Router) { }

  ngOnInit() {
  }
navigateToSearch(){
  this.router.navigate(['/search'])
}
}
