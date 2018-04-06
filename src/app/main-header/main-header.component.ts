import { Component, OnInit } from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: "app-main-header",
  styleUrls: ["./main-header.component.css"],
  templateUrl: "./main-header.component.html",
})
export class MainHeaderComponent {

  constructor(public authService: AuthService, public router: Router ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
