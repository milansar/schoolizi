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

  constructor(private db: AngularFireDatabase, private afs: AngularFirestore) { }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
    console.log(uploadTask);
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
     console.log("file",fileUpload.file.name)
     console.log("var",fileUpload.name)
     return uploadTask.then(uploadFileRes=>fileUpload.name); 
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload);

    var image = [];
    image.push(fileUpload.url);
    this.afs.collection("posts").doc(this.user.uid).update({ url: fileUpload.url });
    // console.log(image);

  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
