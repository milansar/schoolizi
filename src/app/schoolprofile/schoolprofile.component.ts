import { Component, OnInit } from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

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
  content: string;
  title: string;
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  constructor(private afs: AngularFirestore) {

  }
ngOnInit() {
    this.postsCol = this.afs.collection("posts");
    this.posts = this.postsCol.valueChanges();
  }

addPost() {
    this.afs.collection("posts").add({title: this.title, content: this.content});
  }
}
