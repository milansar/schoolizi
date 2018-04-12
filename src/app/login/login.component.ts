import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireAuthModule} from "angularfire2/auth";
import * as firebase from "firebase/app";
import {AuthService} from "../auth.service";

@Component({
  selector: "app-login",
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
 email: string;
 password: string;
  errorMessage = "";
  constructor(public authService: AuthService , public au: AngularFireAuth, public router: Router) {}

  // validateForm(email: string, password: string): boolean {
  //   if (email.length === 0) {
  //     this.errorMessage = "Please enter Email!";
  //     return false;
  //   }

  //   if (password.length === 0) {
  //     this.errorMessage = "Please enter Password!";
  //     return false;
  //   }

  //   if (password.length < 6) {
  //     this.errorMessage = "Password should be at least 6 characters!";
  //     return false;
  //   }

  //   this.errorMessage = "";

  //   return true;
  // }

  login() {
    this.authService.login(this.email, this.password).then( (res) => {
      if (res.uid) {
        this.router.navigate(["profile"]);
      }  else {
        console.log(res);
      }
    });
    this.email = this.password = "";
  }

logingoogle() {
    this.au.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((value) => {
        console.log("Success!", value);
        console.log(value.uid);
        localStorage.setItem("value", value.uid);
        this.router.navigate(["profile"]);
        return value;
      })
      .catch((err) => {
        console.log("Something went wrong:", err.message);
        return err.message;
      });
        // this.router.navigate(['profile']);
  }
 error() {
    const x = this.authService.errorch;
  }
}
