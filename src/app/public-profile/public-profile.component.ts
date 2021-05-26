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
  image = null;
  ownUser = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');

    this.userService.getUserProfile(this.username).subscribe(
      (data:any) => {
        this.userProfile = data;
        if(data.products.length==0) {
          this.noProducts=true;
        } else {
          this.noProducts=false;
        };
        let userData = localStorage.getItem('userProfile');
          if (userData != null) {
            let userProfile = JSON.parse(userData);
              if (data._id == userProfile._id) {
                this.ownUser = true;
              }
          }
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
