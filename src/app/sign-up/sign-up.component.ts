import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  titulo = 'GardenForYou';

  constructor(private router: Router, private userService: UserService, private user: User) { }

  ngOnInit() {
  }

}
