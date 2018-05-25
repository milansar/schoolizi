import { Injectable } from '@angular/core';
import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

import { FileUpload } from './fileupload';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';
import { FieldValue, FieldPath } from '@firebase/firestore-types';
import 'rxjs/add/operator/map';
import { Post, PostID } from "../data";


@Injectable()
export class UploadFileService {

  private basePath = '/uploads';
  user = firebase.auth().currentUser;
  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  currentFileUpload: FileUpload;

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    // return uploadTask.then(uploadFileRes => uploadFileRes.metadata.downloadURLs);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
       (snapshot) => {
         // in progress
         const snap = snapshot as firebase.storage.UploadTaskSnapshot;
         progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
       },
       (error) => {
         // fail
         console.log(error);
       },
       () => {
         // success
         fileUpload.url = uploadTask.snapshot.downloadURL;
         fileUpload.name = fileUpload.file.name;
       }
     );
     fileUpload.name = fileUpload.file.name;
     return uploadTask.then(uploadFileRes=>fileUpload.name); 
  }


   deleteFileDatabase(singlepost) {
    this.afs.collection("posts").doc(this.user.uid).collection("imagebox").doc(singlepost.id).delete();
  }

  // private deleteFileStorage(currentfileupload) {
  //   const storageRef = firebase.storage().ref();
  //   storageRef.child(`${this.basePath}/${name}`).delete();
  // }
}
