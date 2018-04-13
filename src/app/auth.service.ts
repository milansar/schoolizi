import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import * as firebase from "firebase/app";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs/Observable";

interface User {
  uid: string;
  email: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
user: Observable<User>; // firebase.User
errorch: any;

  constructor(private firebaseAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
  }

    signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log("Success!", value);
        console.log(value.uid);
        this.afs.collection("posts").doc(value.uid).set({name:"raj"});
        // .set({id:value.uid})
        return value;
      })
      .catch((err) => {
        console.log("Something went wrong:", err.message);
      });
  }

    login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then((value) => {
        console.log("Success!", value);
        console.log(value.uid);
        localStorage.setItem("value", value.uid);
        return value;

      })
      .catch((err) => {
        console.log("Something went wrong:", err.message);
        this.errorch = err.message;
        return err.message;
      });
  }

    logout() {
    localStorage.clear();
    this.firebaseAuth.auth.signOut();
  }

}
