import { Component, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import * as firebase from "firebase/app";
import { AngularFireModule } from "angularfire2";
import {CoredatabaseService} from "../coredatabase.service"
import {Post} from "../data";

@Component({
  selector: "app-schoolprofile",
  styleUrls: ["./schoolprofile.component.css"],
  templateUrl: "./schoolprofile.component.html",
  providers:[CoredatabaseService]
})
export class SchoolprofileComponent implements OnInit {
  constructor(private core:CoredatabaseService,private afs: AngularFirestore){}
  mode = 0;
  add:any;
  content: string;
  title: string;
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  ngOnInit() {
    const {uid} = firebase.auth().currentUser;
    this.postsCol = this.afs.collection('posts', ref => ref.where('id', '==', uid));
    this.posts = this.postsCol.valueChanges();
  }
  
  adddata(){
    this.add=this.core.addPost(this.content, this.title);
  }

  switchmode() {
    this.mode = 1;
  }
}