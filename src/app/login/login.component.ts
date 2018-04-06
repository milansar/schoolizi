import { Component, OnInit } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(public authService: AuthService ,public au:AngularFireAuth,public router:Router) {}
  
  ngOnInit() {
  }
  login() {
    this.authService.login(this.email, this.password).then(res => {
      if(res.uid){
        this.router.navigate(['profile']);
      }  else{
        console.log(res);
      }
    });
    this.email = this.password = '';
  }
 
  logingoogle() {
    this.au.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(value => {
        console.log('Success!', value);
        console.log(value.uid);
        localStorage.setItem('value',value.uid);
        this.router.navigate(['profile']); 
        return value;
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        return err.message;
      });
        // this.router.navigate(['profile']);  
  }
  error(){
    var x =this.authService.errorch;
  }
}
