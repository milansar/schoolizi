import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  errorch:any;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        return value;
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        console.log(value.uid);
        localStorage.setItem('value',value.uid);
        return value;
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.errorch=err.message;
        return err.message;
      });
  }

  logout() {
    localStorage.clear();
    this.firebaseAuth.auth.signOut();
  }
}