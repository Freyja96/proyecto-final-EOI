import { UserService } from './../services/user.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit {
  image = null;
  username: any;
  userProfile: any;
  noProducts: null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);

    this.userService.getUserProfile(this.username).subscribe(
      (data:any) => {
        this.userProfile = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  //dontHaveProducts(this.userService.getUserProfile()==){

  //}
}
