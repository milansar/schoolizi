import { Component, OnInit, Input } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { merge } from "rxjs/observable/merge";
import * as firebase from "firebase/app";
import { AngularFireModule } from "angularfire2";
import { CoredatabaseService } from "../coredatabase.service"
import { Post } from "../data";
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
  @Input() fileUpload: FileUpload;
  constructor(
    private coredatabaseService: CoredatabaseService,
    private afs: AngularFirestore,
    private uploadService: UploadFileService,
    private storage:AngularFireStorage
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
  imageList: string[];
  image;
  imageshow: any;
  imageFinal:any;
  private basePath = '/uploads';

  ngOnInit() {
    this.imageList = [];
    const { uid } = firebase.auth().currentUser;
    this.postsCol = this.afs.collection('posts', ref => ref.where('id', '==', uid));
    this.posts = this.postsCol.valueChanges();

    // const storageRef=firebase.storage().ref("/uploads/imagelogo.png");
    // storageRef.getDownloadURL().then(function(url) {
    //   console.log(url);
    // });

    // const valueRef=storageRef.child("upload/imagelogo.png");
    // valueRef.getMetadata().then(function(metadata) {
    // }).catch(function(error) {
    // });
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        if (data.url) {
          this.imageList = <any>data.url;
        }
        this.image = this.imageList;

        this.imageFinal=[];
        for(var i=0; i < this.image.length; i++){
            const imageurl=this.storage.ref("uploads/"+this.image[i]);
            this.imageshow =imageurl.getDownloadURL();
            this.imageFinal.push(this.imageshow);
            }

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
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress).then((file) => {
      this.imageList.push(file);
      this.coredatabaseService.addPost(this.content, this.title, this.imageList);
    });
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}