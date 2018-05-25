import { Component, OnInit, Input } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import * as firebase from "firebase/app";
import { AngularFireModule } from "angularfire2";
import { CoredatabaseService } from "../coredatabase.service"
import { Post, Image } from "../data";
import { UploadFileService } from '../Image/upload-file.service';
import { FileUpload } from '../Image/fileupload';
import { FieldValue, FieldPath } from '@firebase/firestore-types';
import { createStorageRef, AngularFireStorage } from "angularfire2/storage";


@Component({
  selector: "app-schoolprofile",
  styleUrls: ["./schoolprofile.component.css"],
  templateUrl: "./schoolprofile.component.html",
})

export class SchoolprofileComponent implements OnInit {
  constructor(
    private coredatabaseService: CoredatabaseService,
    private afs: AngularFirestore,
    private uploadService: UploadFileService,
    private storage: AngularFireStorage
  ) { }
  mode = 0;
  content: string;
  title: string;
  url: string;
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  imageBoxCollection: AngularFirestoreCollection<Post>;
  images: Observable<Post[]>;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  // imageList: string[];
  image;
  // imageshow: any;
  // imageFinal:any;
  private basePath = '/uploads';
  user = firebase.auth().currentUser;

  ngOnInit() {
    this.postsCol = this.afs.collection('posts');
    this.getdata();
    this.getimage();
  }

  adddata() {
    this.upload();
  }

  getdata() {
    const { uid } = firebase.auth().currentUser;
    // this.postsCol = this.afs.collection('posts', ref => ref.where('id', '==', uid));

    this.posts = this.postsCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    })
  }

  getimage() {
    this.imageBoxCollection = this.postsCol.doc(this.user.uid).collection("imagebox");
    this.images = this.imageBoxCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        data['url'] = this.storage.ref("uploads/" + data.name).getDownloadURL();
        return { id, ...data };
      })
    })
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress).then((file) => {
      this.image = this.currentFileUpload;
      this.coredatabaseService.addPost(this.content, this.title);
      this.coredatabaseService.addimage(this.image);
    });
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

  deleteFileUpload(singlepost) {
    console.log(singlepost)
    this.uploadService.deleteFileDatabase(singlepost);
  }

}