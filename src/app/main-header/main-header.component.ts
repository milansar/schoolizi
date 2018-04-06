import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  constructor(public authService: AuthService,public router:Router ) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']); 
  }
}
