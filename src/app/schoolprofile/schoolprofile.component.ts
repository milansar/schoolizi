
import { Component, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";

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
    this.pageMode = "viewmode";
  }

  addPost() {
    this.afs.collection("posts").doc("Dkz8TegdmebWm0IZYQWLFI2Oa0m2").update({title:this.title,content:this.content});
    this.mode = 0;
    // this.afs.collection("posts").doc('a').set({});
    // .add({ title: this.title, content: this.content })
  }

  switchmode() {
    this.mode = 1;
  }
}