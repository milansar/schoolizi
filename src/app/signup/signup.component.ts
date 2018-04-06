import { Component, Input, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import * as firebase from "firebase/app";
import {AuthService} from "../auth.service";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: "app-signup",
  styleUrls: ["./signup.component.css"],
  templateUrl: "./signup.component.html",
})

export class SignupComponent {
 email: string;
 password: string;

  constructor(public authService: AuthService, public router: Router) {}
signup() {
    this.authService.signup(this.email, this.password).then((res) => {
      if (res.uid) {
        this.router.navigate(["profile"]);
      }  else {
        console.log(res);
      }
    });
    this.email = this.password = "";
  }

}
