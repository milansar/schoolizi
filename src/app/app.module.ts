import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {MatButtonModule, MatCheckboxModule} from "@angular/material";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import {environment} from "../environments/environment";
import { AppRoutingModule } from ".//app-routing.module";
import { AppComponent } from "./app.component";
import {AuthService} from "./auth.service";
import { AuthguardService } from "./authguard.service";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MainHeaderComponent } from "./main-header/main-header.component";
import { SchoolprofileComponent } from "./schoolprofile/schoolprofile.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SchoolprofileComponent,
    SignupComponent,
    MainHeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
  ],
  providers: [AuthService, AuthguardService],

})
export class AppModule { }
