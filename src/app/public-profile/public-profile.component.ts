import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit {
  username: any;
  userProfile: any;
  noProducts: boolean=false;

  ownUser = true;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    console.log(this.username);
    this.userService.getUserProfile(this.username).subscribe(
      (data:any) => {
        this.userProfile = data;
        console.log(data);
        if(data.products.length==0) {
          this.noProducts=true;
        } else {
          this.noProducts=false;
        };
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
