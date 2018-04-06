import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../auth.service';
import {LoginComponent} from '../login/login.component';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  email: string;
  password: string;
    
  constructor(public authService: AuthService, public router:Router,) {}
  signup() {
    this.authService.signup(this.email, this.password).then(res => {
      if(res.uid){
        this.router.navigate(['profile']);
      }  else{
        console.log(res);
      }
    });
    this.email = this.password = '';
  }
  ngOnInit() {
  }

}
