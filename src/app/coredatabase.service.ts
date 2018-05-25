import { Injectable } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import * as firebase from "firebase/app";
import { AngularFireModule } from "angularfire2";
import { Post } from "./data";

@Injectable()

export class CoredatabaseService implements OnInit {
  content: string;
  title: string;
  image:any;
  mode = 0;
  user = firebase.auth().currentUser;


  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
  }

  addPost(content: string, title: string, ) {
    return this.afs.collection("posts").doc(this.user.uid).set({ title: title, content: content })
      .then((value) => {
        this.mode = 0;
        return value;
      })
    // this.afs.collection("posts").doc('a').set({});
    // .add({ title: this.title, content: this.content })
  }
  addimage(image:any){
    console.log("core " + image.name);
    console.log("all"+JSON.stringify(image));
    return this.afs.collection("posts").doc(this.user.uid).collection("imagebox").add({name:image.name});
  }
}
