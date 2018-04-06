import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {SchoolprofileComponent} from './schoolprofile/schoolprofile.component';
import { AuthguardService } from './authguard.service';
import { HomeComponent } from './home/home.component';


const route:Routes=[
  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'login',component: LoginComponent},
  {path:'signup',component: SignupComponent},
  {path:'profile',component:SchoolprofileComponent,canActivate:[AuthguardService]}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { 
}
