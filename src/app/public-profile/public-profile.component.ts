import { UserService } from './../services/user.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileComponent implements OnInit {
  username: any;
  userProfile: any;
  noProducts: boolean = false;
  image = null;
  ownUser = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.activeRoute.params.subscribe((param) => {
          this.username = param.username != null ? param.username : null;
          this.ngOnInit();
        });
      }
    });
  }

  ngOnInit() {
    this.username = this.activeRoute.snapshot.paramMap.get('username');

    this.userService.getUserProfile(this.username).subscribe(
      (data: any) => {
        this.userProfile = data;
        if (data.products.length == 0) {
          this.noProducts = true;
        } else {
          this.noProducts = false;
        }
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
    );
  }
}
