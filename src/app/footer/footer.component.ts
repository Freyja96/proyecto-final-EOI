import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  titulo="GardenForYou";
  logged:boolean = true;

  constructor() { }

  userProfile = {
    image: {
      url:
        'https://thispersondoesnotexist.com/image',
    }
  };
  ngOnInit() {
  }

}
