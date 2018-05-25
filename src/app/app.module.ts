import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {MatButtonModule, MatCheckboxModule} from "@angular/material";
import {MatCardModule} from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import {environment} from "../environments/environment";
import { AppRoutingModule } from ".//app-routing.module";
import { AppComponent } from "./app.component";
import {AuthService} from "./auth.service";
import { AuthGuard } from "./authguard.service";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MainHeaderComponent } from "./main-header/main-header.component";
import { SchoolSearchComponent } from "./school-search/school-search.component";
import { SchoolprofileComponent } from "./schoolprofile/schoolprofile.component";
import { SignupComponent } from "./signup/signup.component";
import { CoredatabaseService } from "./coredatabase.service";
import { UploadFileService } from './Image/upload-file.service';



@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SchoolprofileComponent,
    SignupComponent,
    MainHeaderComponent,
    HomeComponent, SchoolSearchComponent,
    ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
  ],
  providers: [AuthService, AuthGuard, AngularFireDatabase,CoredatabaseService,UploadFileService],

})
export class AppModule { }
