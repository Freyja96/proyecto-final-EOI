import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  userEmail="email.actual@gmail.com";
  userPassword="";
  titulo="GardenForYou";
  constructor() { }

  ngOnInit() {
  }

}
