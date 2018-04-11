import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-header",
  styleUrls: ["./header.component.css"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent {

  // constructor() { }

}
