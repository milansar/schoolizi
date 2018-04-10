import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "@firebase/util";
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: "app-upload-image",
  styleUrls: ["./upload-image.component.css"],
  templateUrl: "./upload-image.component.html",
})
export class UploadImageComponent {

  uploadState: any;
  uploadProgress: any;
  task: any;
  ref: any;
  constructor(private storage: AngularFireStorage) { }

  uploadFile(event) {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(randomId);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
  }

}
