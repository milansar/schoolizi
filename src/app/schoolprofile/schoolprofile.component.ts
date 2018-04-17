import { Component, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import * as firebase from "firebase/app";

interface Post {
  title: string;
  content: string;
}
@Component({
  selector: "app-schoolprofile",
  styleUrls: ["./schoolprofile.component.css"],
  templateUrl: "./schoolprofile.component.html",
})
export class SchoolprofileComponent implements OnInit {
  pageMode: string;
  content: string;
  title: string;
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  mode = 0;

  constructor(private afs: AngularFirestore) {

  }
  ngOnInit() {
    this.postsCol = this.afs.collection("posts");
    this.posts = this.postsCol.valueChanges();
    var user= firebase.auth().currentUser;
    if(user){
      console.log("user is login");
    }else{
      console.log("user is not login");
    }
  }

  addPost() {
    var user= firebase.auth().currentUser;
    this.afs.collection("posts").doc(user.uid).update({title:this.title,content:this.content});
    this.mode = 0;
    // this.afs.collection("posts").doc('a').set({});
    // .add({ title: this.title, content: this.content })
  }


  switchmode() {
    this.mode = 1;
  }
}