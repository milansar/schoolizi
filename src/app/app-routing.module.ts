import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthguardService } from "./authguard.service";
import {HeaderComponent} from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SchoolprofileComponent} from "./schoolprofile/schoolprofile.component";
import {SignupComponent} from "./signup/signup.component";

const route: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "profile", component: SchoolprofileComponent, canActivate: [AuthguardService]},
];

@NgModule({
  declarations: [],
  exports: [
    RouterModule,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(route),
  ],
})

export class AppRoutingModule {
}
