import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit {
  products = [1, 2, 3, 5, 6, 7, 8];

  constructor() {}

  ngOnInit() {}
}
