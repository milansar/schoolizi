import { Component, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import * as firebase from "firebase/app";
import { AngularFireModule } from "angularfire2";
import { CoredatabaseService } from "../coredatabase.service"
import { Post } from "../data";
import { UploadFileService } from '../Image/upload-file.service';
import { FileUpload } from '../Image/fileupload';

@Component({
  selector: "app-schoolprofile",
  styleUrls: ["./schoolprofile.component.css"],
  templateUrl: "./schoolprofile.component.html",
})
export class SchoolprofileComponent implements OnInit {
  constructor(
    private coredatabaseService: CoredatabaseService,
    private afs: AngularFirestore,
    private uploadService: UploadFileService
  ) { }
  mode = 0;
  content: string;
  title: string;
  url: string;
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  imageList: any[];

  ngOnInit() {
    this.imageList = [];
    const { uid } = firebase.auth().currentUser;
    this.postsCol = this.afs.collection('posts', ref => ref.where('id', '==', uid));
    this.posts = this.postsCol.valueChanges();

    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        if (data.url) {
          this.imageList.push(data.url);
        }
        console.log(this.imageList);
        return { id, ...data };
      })
    })
  }

  adddata() {
    this.upload();
  }

  switchmode() {
    this.mode = 1;
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress).subscribe((file) => {
      console.log(file);
      console.log(file);
      this.imageList.push(file);
      console.log(this.imageList);
      // this.coredatabaseService.addPost(this.content, this.title, this.imageList);
    });
  }
}